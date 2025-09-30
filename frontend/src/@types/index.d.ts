interface Inspection {
  id: string;
  inspectionDate: string;
  reportState: string;
  reportNumber: string;
  level: string;
  timeWeight: string;
  placarableHmVehInsp: string;
  hmInspection: string;
  vehicles: Vehicle[];
  violations: Violation[];
}

interface Vehicle {
  vin: string;
  type: VehicleType;
  licenseState: string;
  licenseNumber: string;
  additionalInfo?: VehicleAdditionalInfo;
}

interface VehicleAdditionalInfo {
  fuelTypePrimary?: string;
  manufacturer?: string;
  make?: string;
  model?: string;
  modelYear?: string;
  vehicleType?: string;
}

interface Violation {
  code: string;
  description: string;
  oos: string;
  timeSeverityWeight: number;
  basic: string;
  unit: string;
  convictedDifCharge: string;
}

interface UploadProgress {
  total: number;
  processed: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

export type {
  PaginatedResponse,
  Inspection,
  Vehicle,
  Violation,
  VehicleAdditionalInfo,
  UploadProgress,
};
