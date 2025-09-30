import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

import {
  NhtsaApiResponse,
  NhtsaVinFullResponse,
  NhtsaVinResponse,
} from './nhtsa-response.interface'

@Injectable()
export class NhtsaService {
  private readonly logger = new Logger(NhtsaService.name)
  private readonly baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles'

  constructor(private readonly httpService: HttpService) {}

  async decodeVin(vin: string): Promise<NhtsaVinResponse | null> {
    try {
      const url = `${this.baseUrl}/DecodeVinValues/${vin}?format=json`
      const response = await firstValueFrom(
        this.httpService.get<NhtsaApiResponse>(url, {
          timeout: 10000,
        }),
      )

      const result = response.data?.Results?.[0]

      if (!result || result.ErrorCode !== '0') {
        this.logger.warn(
          `Invalid VIN or API error for VIN: ${vin} - ${result?.ErrorText}`,
        )
        return null
      }

      return this.filterProperties(result)
    } catch (error) {
      this.logger.error(`Error decoding VIN ${vin}:`, error.message)
      return null
    }
  }

  private filterProperties(result: NhtsaVinFullResponse): NhtsaVinResponse {
    return {
      fuelTypePrimary: result.FuelTypePrimary,
      manufacturer: result.Manufacturer,
      make: result.Make,
      model: result.Model,
      modelYear: result.ModelYear,
      vehicleType: result.VehicleType,
    }
  }
}
