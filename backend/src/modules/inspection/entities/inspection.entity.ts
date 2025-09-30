import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm'

import { AbstractEntity } from '~/common/abstract.entity'
import { Vehicle } from '~/modules/vehicle/entities/vehicle.entity'
import { Violation } from '~/modules/violation/entities/violation.entity'

@Entity({ name: 'inspections' })
@Index(['inspectionDate'])
@Index(['reportNumber'])
export class Inspection extends AbstractEntity {
  @Column({ type: 'timestamp without time zone' })
  inspectionDate: Date

  @Column({ length: 2 })
  reportState: string

  @Column({ length: 255, unique: true })
  reportNumber: string

  @Column()
  level: number

  @Column()
  timeWeight: number

  @Column({ length: 5 })
  placarableHmVehInsp: string

  @Column({ length: 5 })
  hmInspection: string

  @ManyToMany(() => Vehicle, vehicle => vehicle.inspections)
  @JoinTable({ name: 'inspections_vehicles' })
  vehicles: Vehicle[]

  @ManyToMany(() => Violation, violation => violation.inspections)
  @JoinTable({ name: 'inspections_violations' })
  violations: Violation[]
}
