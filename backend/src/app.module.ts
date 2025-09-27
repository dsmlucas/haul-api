import { Module } from '@nestjs/common'

import { configModule, typeOrmModule } from '~/config/modules.config'

import { InspectionModule } from './modules/inspection/inspection.module'
import { VehicleModule } from './modules/vehicle/vehicle.module'
import { ViolationModule } from './modules/violation/violation.module'

@Module({
  imports: [
    configModule,
    typeOrmModule,
    InspectionModule,
    VehicleModule,
    ViolationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
