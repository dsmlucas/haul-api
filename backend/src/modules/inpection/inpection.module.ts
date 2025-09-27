import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Inpection } from './entities/inpection.entity'
import { InpectionController } from './inpection.controller'
import { InpectionService } from './inpection.service'

@Module({
  imports: [TypeOrmModule.forFeature([Inpection])],
  controllers: [InpectionController],
  providers: [InpectionService],
})
export class InpectionModule {}
