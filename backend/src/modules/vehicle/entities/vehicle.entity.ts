import { Column, Entity, Index, ManyToMany } from 'typeorm'

import { AbstractEntity } from '~/common/abstract.entity'
import { Inspection } from '~/modules/inspection/entities/inspection.entity'
import { VehicleAdditionalInfo } from '~/modules/vehicle/entities/vehicle.interface'

export enum VehicleType {
  TRUCK_TRACTOR = 'Truck Tractor',
  SEMI_TRAILER = 'Semi-Trailer',
  INTERMODAL_CHASSIS = 'Intermodal Chassis',
  STRAIGHT_TRUCK = 'Straight Truck',
  CRIB_LOG = 'Crib Log',
  FULL_TRAILER = 'Full Trailer',
  POLE_TRAILER = 'Pole Trailer',
  SCHOOL_BUS = 'School Bus',
  OTHER = 'Other',
  DOLLY_CONVERTER = 'Dolly/Converter',
}

@Entity({ name: 'vehicles' })
@Index(['type'])
@Index(['licenseNumber'])
@Index(['vin', 'licenseNumber', 'type'], { unique: true })
export class Vehicle extends AbstractEntity {
  @Column({ length: 255 })
  vin: string

  @Column({ length: 255 })
  type: VehicleType

  @Column({ length: 2 })
  licenseState: string

  @Column({ length: 20 })
  licenseNumber: string

  @ManyToMany(() => Inspection, inspection => inspection.vehicles)
  inspections: Inspection[]

  additionalInfo?: VehicleAdditionalInfo
}
