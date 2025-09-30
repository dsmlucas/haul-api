import { IsEnum, IsOptional, IsString } from 'class-validator'

import { PaginationDto } from '~/common/dto/pagination.dto'

enum SortField {
  CREATED_AT = 'inspection.createdAt',
  UPDATED_AT = 'inspection.updatedAt',
  INSPECTION_DATE = 'inspection.inspectionDate',
  REPORT_NUMBER = 'inspection.reportNumber',
  REPORT_STATE = 'inspection.reportState',
  LICENSE_NUMBER = 'vehicles.licenseNumber',
  BASIC = 'violations.basic',
  WEIGHT = 'violations.timeSeverityWeight',
}

export class InspectionFilterDto extends PaginationDto {
  @IsString()
  @IsOptional()
  basic?: string

  @IsString()
  @IsOptional()
  code?: string

  @IsString()
  @IsOptional()
  licenseNumber?: string

  @IsEnum(SortField)
  sortField?: SortField = SortField.INSPECTION_DATE
}
