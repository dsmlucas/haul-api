export interface IViolation {
  code: string
  description: string
  oos: string
  time_severity_weight: string
  BASIC: string
  unit: string
  convicted_of_dif_charge: string
}

export interface IViolationBlock {
  $: IViolation
}
