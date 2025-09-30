import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NhtsaModule } from '~/libs/nhtsa/nhtsa.module'
import { VehicleModule } from '~/modules/vehicle/vehicle.module'
import { ViolationModule } from '~/modules/violation/violation.module'

import { Inspection } from './entities/inspection.entity'
import { InspectionController } from './inspection.controller'
import { InspectionService } from './inspection.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Inspection]),
    NhtsaModule,
    VehicleModule,
    ViolationModule,
  ],
  controllers: [InspectionController],
  providers: [InspectionService],
})
export class InspectionModule {}
