import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Violation } from '~/modules/violation/entities/violation.entity'

import { ViolationService } from './violation.service'

@Module({
  imports: [TypeOrmModule.forFeature([Violation])],
  controllers: [],
  providers: [ViolationService],
  exports: [ViolationService],
})
export class ViolationModule {}
