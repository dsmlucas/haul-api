import { Inspection } from '~/modules/inspection/entities/inspection.entity'
import { IInspectionBlock } from '~/modules/inspection/inspection.interface'
import { VehicleMapper } from '~/modules/vehicle/dto/vehicle.mapper'

export class InspectionMapper {
  static toEntity(block: IInspectionBlock): Inspection {
    const inspection = block.$
    const { vehicles } = block

    const entity = new Inspection()
    entity.inspectionDate = new Date(inspection.inspection_date)
    entity.reportState = inspection.report_state
    entity.reportNumber = inspection.report_number
    entity.level = Number(inspection.level)
    entity.timeWeight = Number(inspection.time_weight)
    entity.placarableHmVehInsp = inspection.Placarable_HM_Veh_Insp
    entity.hmInspection = inspection.HM_inspection

    if (vehicles.vehicle.length) {
      entity.vehicles = VehicleMapper.toEntities(vehicles.vehicle)
    }

    return entity
  }

  static toEntities(inspections: IInspectionBlock[]): Inspection[] {
    return inspections.map(inspection => this.toEntity(inspection))
  }
}
