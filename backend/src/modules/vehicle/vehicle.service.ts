import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseService } from '~/common/base.service'
import { Vehicle } from '~/modules/vehicle/entities/vehicle.entity'

@Injectable()
export class VehicleService extends BaseService<Vehicle> {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {
    super(vehicleRepository)
  }

  async findOrCreate(vehicle: Vehicle): Promise<Vehicle> {
    let entity = await this.vehicleRepository.findOneBy({
      vin: vehicle.vin,
      licenseNumber: vehicle.licenseNumber,
      type: vehicle.type,
    })

    if (!entity) {
      entity = await this.create(vehicle)
      return entity
    }

    return entity
  }
}
