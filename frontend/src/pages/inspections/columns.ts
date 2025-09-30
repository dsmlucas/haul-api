import { Inspection, Vehicle, Violation } from '~/@types';
import { TableColumn } from '~/components/table/types';

const columns: TableColumn<Inspection>[] = [
  {
    name: 'inspection.inspectionDate',
    value: (row: Inspection) =>
      new Date(row.inspectionDate).toLocaleDateString(),
    label: 'Inspection Date',
    minWidth: '20%',
    sortable: true,
  },
  {
    name: 'inspection.reportNumber',
    value: (row: Inspection) => row.reportNumber,
    label: 'Inspection Number',
    sortable: true,
  },
  {
    name: 'inspection.reportState',
    value: (row: Inspection) => row.reportState,
    label: 'State',
    sortable: true,
  },
  {
    name: 'vehicles.licenseNumber',
    value: (row: Inspection) =>
      row.vehicles?.length ? row.vehicles[0].licenseNumber : '-',
    label: 'Vehicle Plate',
    sortable: true,
  },
  {
    name: 'violations.basic',
    value: (row: Inspection) =>
      row.violations?.length ? row.violations[0]?.basic : '-',
    label: 'BASIC',
    sortable: true,
  },
  {
    name: 'violations.timeSeverityWeight',
    value: (row: Inspection) =>
      row.violations?.length ? row.violations[0]?.timeSeverityWeight : '-',
    label: 'Weight',
    sortable: true,
  },
];

const vehicleColumns: TableColumn<Vehicle>[] = [
  {
    name: 'type',
    value: (row: Vehicle) => row.type,
    label: 'Type',
  },
  {
    name: 'licenseNumber',
    value: (row: Vehicle) => row.licenseNumber,
    label: 'License Plate',
  },
  {
    name: 'licenseState',
    value: (row: Vehicle) => row.licenseState,
    label: 'License State',
  },
  {
    name: 'vin',
    value: (row: Vehicle) => row.vin,
    label: 'VIN',
  },
];

const violationColumns: TableColumn<Violation>[] = [
  {
    name: 'code',
    value: (row: Violation) => row.code,
    label: 'Code',
  },
  {
    name: 'unit',
    value: (row: Violation) => row.unit,
    label: 'Unit',
  },
  {
    name: 'oos',
    value: (row: Violation) => (row.oos === 'Y' ? 'Yes' : 'No'),
    label: 'OOS',
  },
  {
    name: 'description',
    value: (row: Violation) => row.description,
    label: 'Description',
  },
  {
    name: 'basic',
    value: (row: Violation) => row.basic,
    label: 'Basic',
  },
  {
    name: 'timeSeverityWeight',
    value: (row: Violation) => row.timeSeverityWeight,
    label: 'Weight',
  },
];

export { columns, vehicleColumns, violationColumns };
