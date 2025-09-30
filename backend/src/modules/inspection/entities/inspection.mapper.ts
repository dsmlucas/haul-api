import { Inspection } from '~/modules/inspection/entities/inspection.entity'
import { IInspectionBlock } from '~/modules/inspection/inspection.interface'
import { VehicleMapper } from '~/modules/vehicle/entities/vehicle.mapper'
import { ViolationMapper } from '~/modules/violation/entities/violation.mapper'

export class InspectionMapper {
  static toEntity(block: IInspectionBlock): Inspection {
    const inspection = block.$
    const { vehicles, violations } = block

    const entity = new Inspection()
    entity.inspectionDate = new Date(inspection.inspection_date)
    entity.reportState = inspection.report_state
    entity.reportNumber = inspection.report_number
    entity.level = Number(inspection.level)
    entity.timeWeight = Number(inspection.time_weight)
    entity.placarableHmVehInsp = inspection.Placarable_HM_Veh_Insp
    entity.hmInspection = inspection.HM_inspection
    entity.vehicles = []
    entity.violations = []

    if (vehicles.vehicle.length) {
      entity.vehicles = VehicleMapper.toEntities(vehicles.vehicle)
    }

    if (violations.violation.length) {
      entity.violations = ViolationMapper.toEntities(violations.violation)
    }

    return entity
  }

  static toEntities(inspections: IInspectionBlock[]): Inspection[] {
    return inspections.map(inspection => this.toEntity(inspection))
  }
}
