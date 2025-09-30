export interface NhtsaVinFullResponse {
  FuelTypePrimary: string
  Manufacturer: string
  Make: string
  Model: string
  ModelYear: string
  VehicleType: string

  ErrorCode: string
  ErrorText: string
}

export interface NhtsaVinResponse {
  fuelTypePrimary: string
  manufacturer: string
  make: string
  model: string
  modelYear: string
  vehicleType: string
}

export interface NhtsaApiResponse {
  Count: number
  Message: string
  SearchCriteria: string
  Results: NhtsaVinFullResponse[]
}
