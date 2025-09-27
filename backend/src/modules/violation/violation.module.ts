import { Module } from '@nestjs/common'

import { ViolationService } from './violation.service'

@Module({
  controllers: [],
  providers: [ViolationService],
})
export class ViolationModule {}
