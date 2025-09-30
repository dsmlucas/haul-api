import { IVehicleBlock } from '~/modules/vehicle/entities/vehicle.interface'
import { IViolationBlock } from '~/modules/violation/entities/violation.interface'

export interface IInspectionVehicles {
  vehicle: IVehicleBlock[]
}

export interface IInspectionViolations {
  violation: IViolationBlock[]
}

export interface IInspection {
  inspection_date: string
  report_state: string
  report_number: string
  level: string
  time_weight: string
  HM_inspection: string
  Placarable_HM_Veh_Insp: string
}

export interface IInspectionBlock {
  $: IInspection
  vehicles: IInspectionVehicles
  violations: IInspectionViolations
}

export interface IInspections {
  inspection: IInspectionBlock[]
}

export interface ICrashVehicle {
  vehicle_id_number: string
  license_state: string
  license_number: string
}
export interface ICrashVehicleBlock {
  $: ICrashVehicle
}

export interface ICrash {
  report_date: string
  report_state: string
  report_number: string
  fatalities: string
  injuries: string
  access_control: string
  light_condition: string
  not_preventable_det: string
  road_surface_condition: string
  severity_time_weight: string
  severity_weight: string
  time_weight: string
  tow_away: string
  trafficway: string
  weather_condition: string
}

export interface ICrashBlock {
  $: ICrash
  vehicle: ICrashVehicleBlock
}

export interface ICrashes {
  crash: ICrashBlock[]
}

export interface ICarrierData {
  inspections: IInspections
  crashes: ICrashes
  serious_violations: string
}

export interface IXmlData {
  carrierData: ICarrierData
}
