import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { VehicleModule } from '~/modules/vehicle/vehicle.module'

import { Inspection } from './entities/inspection.entity'
import { InspectionController } from './inspection.controller'
import { InspectionService } from './inspection.service'

@Module({
  imports: [TypeOrmModule.forFeature([Inspection]), VehicleModule],
  controllers: [InspectionController],
  providers: [InspectionService],
})
export class InspectionModule {}
