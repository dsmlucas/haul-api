import * as React from 'react';
import { useParams } from 'react-router-dom';

import { Breadcrumbs, Link, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Inspection } from '../../@types';
import axiosClient from '../../core/api';
import { Box, Table, DisplayField } from '../../components';
import { vehicleColumns, violationColumns } from './columns';

import VehicleAdditionalInfoCard from './VehicleAdditionalInfoCard';

const displayViewSize = {
  xs: 12,
  md: 6,
};

export default function InspectionDetail() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [inspection, setInspection] = React.useState<Inspection>();

  async function loadInspection(inspectionId: string) {
    setLoading(true);

    try {
      const { data: response } = await axiosClient.get(
        `/inspections/${inspectionId}`,
      );

      if (response) {
        setInspection(response);
      }
    } catch (e) {
      console.error('Error fetching inspection:', e);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (id) {
      loadInspection(id);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!inspection) {
    return <div>Inspection not found</div>;
  }

  return (
    <div>
      <Breadcrumbs style={{ marginBottom: '16px' }}>
        <Link underline="hover" color="text.secondary" href="/inspections">
          Inspections
        </Link>
        <Typography sx={{ color: 'text.secondary' }}>
          {inspection.reportNumber}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box>
            <h2>{inspection.reportNumber || ''}</h2>
            <h3>Inspection Overview</h3>

            <Grid container spacing={2} style={{ marginBottom: '20px' }}>
              <Grid size={displayViewSize}>
                <DisplayField
                  value={inspection.reportNumber}
                  label="Report Number"
                />
              </Grid>

              <Grid size={displayViewSize}>
                <DisplayField
                  value={inspection.reportState}
                  label="Report State"
                />
              </Grid>

              <Grid size={displayViewSize}>
                <DisplayField
                  value={new Date(
                    inspection.inspectionDate,
                  ).toLocaleDateString()}
                  label="Date"
                />
              </Grid>

              <Grid size={displayViewSize}>
                <DisplayField value={inspection.level} label="Level" />
              </Grid>

              <Grid size={displayViewSize}>
                <DisplayField
                  value={inspection.timeWeight}
                  label="Time Weight"
                />
              </Grid>

              <Grid size={displayViewSize}>
                <DisplayField
                  value={inspection.placarableHmVehInsp}
                  label="Placarable HM Vehicle Inspection"
                />
              </Grid>

              <Grid size={displayViewSize}>
                <DisplayField
                  value={inspection.hmInspection}
                  label="HM Inspection"
                />
              </Grid>
            </Grid>

            <h3>Vehicle Information</h3>
            <Table
              columns={vehicleColumns}
              rows={inspection.vehicles}
              rowCount={inspection?.vehicles?.length || 0}
              loading={loading}
              hidePagination
            />

            <h3>Violations</h3>
            <Table
              columns={violationColumns}
              rows={inspection.violations}
              rowCount={inspection?.violations?.length || 0}
              loading={loading}
              hidePagination
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {inspection.vehicles.map((v) => (
            <VehicleAdditionalInfoCard
              key={v.vin}
              additionalInfo={v.additionalInfo}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
