import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as fs from 'fs'
import { Repository } from 'typeorm'
import { parseStringPromise } from 'xml2js'

import { BaseService } from '~/common/base.service'
import { NhtsaService } from '~/libs/nhtsa/nhtsa.service'
import { InspectionFilterDto } from '~/modules/inspection/dto/inspection-filter.dto'
import { InspectionMapper } from '~/modules/inspection/entities/inspection.mapper'
import { Vehicle } from '~/modules/vehicle/entities/vehicle.entity'
import { VehicleService } from '~/modules/vehicle/vehicle.service'
import { Violation } from '~/modules/violation/entities/violation.entity'
import { ViolationService } from '~/modules/violation/violation.service'

import { Inspection } from './entities/inspection.entity'
import { IXmlData } from './inspection.interface'

@Injectable()
export class InspectionService extends BaseService<Inspection> {
  private readonly uploadProgress = { total: 0, processed: 0 }

  constructor(
    @InjectRepository(Inspection)
    private readonly inspectionRepository: Repository<Inspection>,
    private readonly vehicleService: VehicleService,
    private readonly violationService: ViolationService,
    private readonly nhtsaService: NhtsaService,
  ) {
    super(inspectionRepository)
  }

  async upload(file: Express.Multer.File) {
    try {
      const startTime = Date.now()
      const xmlContent = await fs.promises.readFile(file.path, 'utf8')
      const xmlData: IXmlData = await parseStringPromise(xmlContent, {
        explicitArray: false,
      })

      const rawInspections = xmlData?.carrierData?.inspections?.inspection
      this.uploadProgress.total =
        Array.isArray(rawInspections) && rawInspections.length
          ? rawInspections.length
          : 0

      // TODO: implement crashes and serious violations
      // const crashes = xmlData?.carrierData?.crashes?.crash
      // const seriousViolations = xmlData?.carrierData?.serious_violations

      const vehicleMap: Map<string, string> = new Map()
      const violationMap: Map<string, string> = new Map()

      for (const rawInspection of rawInspections) {
        const mappedInspection = InspectionMapper.toEntity(rawInspection)

        const existentInspection = await this.inspectionRepository.findOne({
          select: ['id'],
          where: { reportNumber: mappedInspection.reportNumber },
        })

        if (existentInspection) {
          continue
        }

        const vehicles: Vehicle[] = []

        for (const mappedVehicle of mappedInspection.vehicles) {
          const vehicleTag = `${mappedVehicle.vin}/${mappedVehicle.licenseNumber}/${mappedVehicle.type}`

          if (vehicleMap.has(vehicleTag)) {
            const vehicleId = vehicleMap.get(vehicleTag)

            const existent = vehicles.find(v => v.id === vehicleId)
            if (existent) {
              continue
            }
            vehicles.push({ id: vehicleId } as Vehicle)
            continue
          }

          const vehicle = await this.vehicleService.findOrCreate(mappedVehicle)
          vehicleMap.set(vehicleTag, vehicle.id)
          vehicles.push(vehicle)
        }

        const violations: Violation[] = []

        for (const mappedViolation of mappedInspection.violations) {
          const violationTag = `${mappedViolation.code}`

          if (violationMap.has(violationTag)) {
            const violationId = violationMap.get(violationTag)

            const existent = violations.find(v => v.id === violationId)
            if (existent) {
              continue
            }
            violations.push({ id: violationId } as Violation)
            continue
          }

          const violation =
            await this.violationService.findOrCreate(mappedViolation)
          violationMap.set(violationTag, violation.id)
          violations.push(violation)
        }

        await this.inspectionRepository.save({
          ...mappedInspection,
          vehicles,
          violations,
        })

        this.uploadProgress.processed += 1
      }

      await fs.promises.unlink(file.path)

      const endTime = Date.now()
      const duration = (endTime - startTime) / 1000

      this.logger.log(`XML file processed in ${duration} seconds`)

      return {
        message: 'XML file processed successfully',
        duration,
      }
    } catch (error) {
      this.logger.error('Error processing XML file:', error)

      try {
        await fs.promises.unlink(file.path)
      } catch (unlinkError) {
        this.logger.error('Error cleaning up file:', unlinkError)
      }

      throw new Error('Failed to process XML file')
    } finally {
      this.uploadProgress.total = 0
      this.uploadProgress.processed = 0
    }
  }

  async findAll(filters = new InspectionFilterDto()) {
    const { basic, code, licenseNumber } = filters

    const qb = this.inspectionRepository
      .createQueryBuilder('inspection')
      .leftJoinAndSelect('inspection.vehicles', 'vehicles')
      .leftJoinAndSelect('inspection.violations', 'violations')

    if (basic) {
      qb.andWhere('violations.basic ILIKE :basic', {
        basic: `%${basic}%`,
      })
    }

    if (code) {
      qb.andWhere('violations.code ILIKE :code', {
        code: `%${code}%`,
      })
    }

    if (licenseNumber) {
      qb.andWhere('vehicles.licenseNumber ILIKE :licenseNumber', {
        licenseNumber: `%${licenseNumber}%`,
      })
    }

    qb.orderBy(`${filters.sortField}`, filters.order, 'NULLS LAST')
      .skip(filters.skip)
      .take(filters.limit)

    const [results, total] = await qb.getManyAndCount()

    return Inspection.toDtos(results, filters, total)
  }

  async findOne(id: string): Promise<Inspection> {
    try {
      const entity = await this.repository.findOne({
        where: { id },
        relations: ['vehicles', 'violations'],
      })

      if (!entity) {
        throw new NotFoundException(`Inspection with ID ${id} not found`)
      }

      for (const vehicle of entity.vehicles) {
        if (!vehicle.vin) continue

        const vehicleDetails = await this.nhtsaService.decodeVin(vehicle.vin)

        this.logger.debug(vehicleDetails)

        if (vehicleDetails) {
          vehicle.additionalInfo = vehicleDetails
        }
      }

      return entity.toDto()
    } catch (error) {
      this.logger.error(`Error finding entity with ID ${id}:`, error)
      throw error
    }
  }

  getUploadProgress() {
    return this.uploadProgress
  }
}
