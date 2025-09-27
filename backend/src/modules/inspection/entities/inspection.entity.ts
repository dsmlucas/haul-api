import { Column, Entity, Index } from 'typeorm'

import { AbstractEntity } from '~/common/abstract.entity'

@Entity({ name: 'inspections' })
@Index(['inspectionDate'])
@Index(['reportNumber'])
export class Inspection extends AbstractEntity {
  @Column({ type: 'timestamp without time zone' })
  inspectionDate: Date

  @Column({ length: 2 })
  reportState: string

  @Column({ length: 255 })
  reportNumber: string

  @Column()
  level: number

  @Column()
  timeWeight: number

  @Column({ length: 5 })
  placarableHmVehInsp: string

  @Column({ length: 5 })
  hmInspection: string
}
