import { Module } from '@nestjs/common'

import { configModule, typeOrmModule } from '~/config/modules.config'

import { InpectionModule } from './modules/inpection/inpection.module'
import { VehicleModule } from './modules/vehicle/vehicle.module'

@Module({
  imports: [configModule, typeOrmModule, InpectionModule, VehicleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
