export interface IInspectionViolation {
  $: {
    convicted_of_dif_charge: string
  }
}

export interface IInspectionVehicle {
  $: {
    unit: string
    vehicle_id_number: string
    unit_type: string
    license_state: string
    license_number: string
  }
}

export interface IInspectionVehicles {
  vehicle: IInspectionVehicle[]
}

export interface IInspectionViolations {
  violation: IInspectionViolation
}

export interface IInspection {
  $: {
    inspection_date: string
    report_state: string
    report_number: string
    level: string
    time_weight: string
    HM_inspection: string
    Placarable_HM_Veh_Insp: string
  }
  vehicles: IInspectionVehicles
  violations: IInspectionViolations
}

export interface IInspections {
  inspection: IInspection[]
}

export interface ICrashVehicle {
  $: {
    vehicle_id_number: string
    license_state: string
    license_number: string
  }
}

export interface ICrash {
  $: {
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
  vehicle: ICrashVehicle
}

export interface ICrashes {
  crash: ICrash[]
}

export interface ICarrierData {
  inspections: IInspections
  crashes: ICrashes
  serious_violations: string
}

export interface IXmlData {
  carrierData: ICarrierData
}
