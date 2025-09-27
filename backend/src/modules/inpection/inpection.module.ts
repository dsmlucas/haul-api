import { Module } from '@nestjs/common'

import { InpectionController } from './inpection.controller'
import { InpectionService } from './inpection.service'

@Module({
  controllers: [InpectionController],
  providers: [InpectionService],
})
export class InpectionModule {}
