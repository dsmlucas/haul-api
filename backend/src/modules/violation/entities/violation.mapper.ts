import { Violation } from '~/modules/violation/entities/violation.entity'
import { IViolationBlock } from '~/modules/violation/entities/violation.interface'

export class ViolationMapper {
  static toEntity(block: IViolationBlock): Violation {
    const violation = block.$

    const entity = new Violation()
    entity.code = violation.code
    entity.description = violation.description
    entity.oos = violation.oos
    entity.timeSeverityWeight = Number(violation.time_severity_weight)
    entity.basic = violation.BASIC
    entity.unit = violation.unit
    entity.convictedDifCharge = violation.convicted_of_dif_charge

    return entity
  }

  static toEntities(violations: IViolationBlock[]): Violation[] {
    return violations.map(violation => this.toEntity(violation))
  }
}
