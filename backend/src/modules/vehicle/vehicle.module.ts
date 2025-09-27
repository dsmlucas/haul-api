import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Vehicle } from './entities/vehicle.entity'
import { VehicleService } from './vehicle.service'

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [],
  providers: [VehicleService],
})
export class VehicleModule {}
