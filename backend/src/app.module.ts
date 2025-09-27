import { Module } from '@nestjs/common'

import { configModule, typeOrmModule } from '~/config/modules.config'

import { InpectionModule } from './modules/inpection/inpection.module'
import { VehicleModule } from './modules/vehicle/vehicle.module'
import { ViolationModule } from './modules/violation/violation.module'

@Module({
  imports: [
    configModule,
    typeOrmModule,
    InpectionModule,
    VehicleModule,
    ViolationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
