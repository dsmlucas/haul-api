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
}
