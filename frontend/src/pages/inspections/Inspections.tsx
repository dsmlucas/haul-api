import * as React from 'react';
import { useNavigate } from 'react-router';

import { PaginatedResponse, Inspection, UploadProgress } from '../../@types';
import { ProgressBar, Table } from '../../components';
import axiosClient from '../../core/api';

import FilterInspectionsDialog from './FilterInspectionsDialog';
import { FilterForm } from './types';
import { columns } from './columns';
import ImportXml from './ImportXml';

type Response = PaginatedResponse<Inspection>;

const boxStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

export default function Inspections() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [rowCount, setRowCount] = React.useState(0);
  const [inspections, setinspections] = React.useState<Inspection[]>([]);
  const [filters, setFilters] = React.useState<FilterForm>({});
  const [progress, setProgress] = React.useState<UploadProgress>();
  const [showProgress, setShowProgress] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log('# once');
    loadProgress();
  }, []);

  React.useEffect(() => {
    console.log('>>> progress', progress?.processed, progress?.total);

    if (progress && progress.processed >= progress.total) {
      setShowProgress(false);
    }

    const interval = setInterval(() => {
      loadProgress();
    }, 5_000);

    return () => {
      clearInterval(interval);
    };
  }, [progress]);

  async function loadInspections(
    page: number,
    pageSize: number,
    order?: string,
    orderBy?: string,
  ) {
    setLoading(true);

    try {
      const { data: response } = await axiosClient.get<Response>(
        '/inspections',
        {
          params: {
            page: page,
            limit: pageSize,
            sortField: orderBy,
            order,
            ...filters,
          },
        },
      );

      if (response) {
        setinspections(response.data);
        setRowCount(response.pagination.totalCount);
      }
    } catch (e) {
      console.error('Error fetching inspections:', e);
    } finally {
      setLoading(false);
    }
  }

  async function loadProgress() {
    try {
      const { data: response } = await axiosClient.get<UploadProgress>(
        '/inspections/upload/progress',
      );

      if (response?.total === 0) {
        setShowProgress(false);
        setProgress({ processed: 0, total: 0 });
      } else {
        setShowProgress(true);
        setProgress(response);
      }
    } catch (e) {
      console.error('Error fetching upload progress:', e);
    }
  }

  async function onImportXml() {
    setShowProgress(true);

    await fetchData(1, 5);
  }

  const progressValue = () =>
    progress && progress.total > 0
      ? (progress.processed / progress.total) * 100
      : 0;

  const fetchData = React.useCallback(loadInspections, [filters]);

  const toolbarItems = (
    <FilterInspectionsDialog onSubmit={setFilters} initialValues={filters} />
  );

  return (
    <div>
      <div style={boxStyle}>
        <h2>Inspections</h2>
        <ImportXml onImport={onImportXml} />
      </div>

      {showProgress && (
        <ProgressBar value={progressValue()} label="Importing..." />
      )}

      <Table
        fetchData={fetchData}
        columns={columns}
        rows={inspections}
        rowCount={rowCount}
        loading={loading}
        toolbarItems={toolbarItems}
        onRowClick={(row: Inspection) => navigate(`/inspections/${row.id}`)}
      />
    </div>
  );
}
