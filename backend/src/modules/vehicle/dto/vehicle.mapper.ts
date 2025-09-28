import {
  IVehicle,
  IVehicleBlock,
} from '~/modules/inspection/inspection.interface'
import { Vehicle, VehicleType } from '~/modules/vehicle/entities/vehicle.entity'

export class VehicleMapper {
  static toEntity(vehicle: IVehicle): Vehicle {
    const entity = new Vehicle()
    entity.type = this.toVehicleType(vehicle.unit_type)
    entity.vin = vehicle.vehicle_id_number || 'NO_VIN'
    entity.licenseState = vehicle.license_state
    entity.licenseNumber = vehicle.license_number

    return entity
  }

  static toEntities(vehicles: IVehicleBlock[]): Vehicle[] {
    const filteredVehicles = vehicles.filter(
      v => v.$.vehicle_id_number && v.$.license_number,
    )
    return filteredVehicles.map(vehicle => this.toEntity(vehicle.$))
  }

  private static toVehicleType(unitType: string): VehicleType {
    const mapping: Record<string, VehicleType> = {
      'Truck Tractor': VehicleType.TRUCK_TRACTOR,
      'Semi-Trailer': VehicleType.SEMI_TRAILER,
      'Intermodal Chassis': VehicleType.INTERMODAL_CHASSIS,
      'Straight Truck': VehicleType.STRAIGHT_TRUCK,
      'Crib Log': VehicleType.CRIB_LOG,
      'Full Trailer': VehicleType.FULL_TRAILER,
      'Pole Trailer': VehicleType.POLE_TRAILER,
      'School Bus': VehicleType.SCHOOL_BUS,
      Other: VehicleType.OTHER,
      'Dolly/Converter': VehicleType.DOLLY_CONVERTER,
    }

    return mapping[unitType] || VehicleType.OTHER
  }
}
