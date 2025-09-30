export interface IVehicle {
  unit: string
  vehicle_id_number: string
  unit_type: string
  license_state: string
  license_number: string
}

export interface IVehicleBlock {
  $: IVehicle
}

export interface VehicleAdditionalInfo {
  fuelTypePrimary?: string
  manufacturer?: string
  make?: string
  model?: string
  modelYear?: string
  vehicleType?: string
}
