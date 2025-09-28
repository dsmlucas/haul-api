import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as fs from 'fs'
import { Repository } from 'typeorm'
import { parseStringPromise } from 'xml2js'

import { BaseService } from '~/common/base.service'
import { InspectionMapper } from '~/modules/inspection/dto/inspection.mapper'
import { Vehicle } from '~/modules/vehicle/entities/vehicle.entity'
import { VehicleService } from '~/modules/vehicle/vehicle.service'

import { Inspection } from './entities/inspection.entity'
import { IXmlData } from './inspection.interface'

@Injectable()
export class InspectionService extends BaseService<Inspection> {
  constructor(
    @InjectRepository(Inspection)
    private readonly inspectionRepository: Repository<Inspection>,
    private readonly vehicleService: VehicleService,
  ) {
    super(inspectionRepository)
  }

  async upload(file: Express.Multer.File) {
    let tag = ''

    try {
      const startTime = Date.now()
      const xmlContent = await fs.promises.readFile(file.path, 'utf8')
      const xmlData: IXmlData = await parseStringPromise(xmlContent, {
        explicitArray: false,
      })

      const rawInspections = xmlData?.carrierData?.inspections?.inspection

      // TODO: implement crashes and serious violations
      // const crashes = xmlData?.carrierData?.crashes?.crash
      // const seriousViolations = xmlData?.carrierData?.serious_violations

      // const inspections: Inspection[] = []
      const vehicleMap: Map<string, string> = new Map()

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

          tag = `${rawInspection.$.report_number}-${vehicleTag}`

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

        await this.inspectionRepository.save({
          ...mappedInspection,
          vehicles,
        })
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
      this.logger.debug(tag)
      this.logger.error('Error processing XML file:', error)

      try {
        await fs.promises.unlink(file.path)
      } catch (unlinkError) {
        this.logger.error('Error cleaning up file:', unlinkError)
      }

      throw new Error('Failed to process XML file')
    }
  }
}
