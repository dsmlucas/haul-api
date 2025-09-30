import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { NhtsaService } from './nhtsa.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 3,
    }),
  ],
  providers: [NhtsaService],
  exports: [NhtsaService],
})
export class NhtsaModule {}
