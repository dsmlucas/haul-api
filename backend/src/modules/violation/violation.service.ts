import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseService } from '~/common/base.service'
import { Violation } from '~/modules/violation/entities/violation.entity'

@Injectable()
export class ViolationService extends BaseService<Violation> {
  constructor(
    @InjectRepository(Violation)
    private readonly violationRepository: Repository<Violation>,
  ) {
    super(violationRepository)
  }

  async findOrCreate(vehicle: Violation): Promise<Violation> {
    let entity = await this.violationRepository.findOneBy({
      code: vehicle.code,
    })

    if (!entity) {
      entity = await this.create(vehicle)
      return entity
    }

    return entity
  }
}
