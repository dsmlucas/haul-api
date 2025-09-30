import { Column, Entity, Index, ManyToMany } from 'typeorm'

import { AbstractEntity } from '~/common/abstract.entity'
import { Inspection } from '~/modules/inspection/entities/inspection.entity'

@Entity({ name: 'violations' })
@Index(['oos', 'unit'])
@Index(['basic'])
@Index(['code'])
export class Violation extends AbstractEntity {
  @Column({ length: 255, unique: true })
  code: string

  @Column({ length: 255 })
  description: string

  @Column({ length: 1 })
  oos: string

  @Column()
  timeSeverityWeight: number

  @Column({ length: 255 })
  basic: string

  @Column({ length: 1 })
  unit: string

  @Column({ length: 1 })
  convictedDifCharge: string

  @ManyToMany(() => Inspection, inspection => inspection.violations)
  inspections: Inspection[]
}
