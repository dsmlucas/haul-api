import { Module } from '@nestjs/common'

import { InpectionModule } from './modules/inpection/inpection.module'

@Module({
  imports: [InpectionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
