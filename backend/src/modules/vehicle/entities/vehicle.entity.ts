import { Column, Entity, Index } from 'typeorm'

import { AbstractEntity } from '~/common/abstract.entity'

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
export class Vehicle extends AbstractEntity {
  @Column({ length: 255 })
  vin: string

  @Column({ length: 255 })
  type: VehicleType

  @Column({ length: 2 })
  licenseState: string

  @Column({ length: 2, unique: true })
  licenseNumber: string
}
