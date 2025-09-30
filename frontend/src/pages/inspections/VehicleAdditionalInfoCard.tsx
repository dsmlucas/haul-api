import { Typography } from '@mui/material';

import { VehicleAdditionalInfo } from '../../@types';
import { Box } from '../../components';

const boxStyle: React.CSSProperties = {
  background: 'var(--base-bg-color-2)',
  border: '1px solid var(--disabled-text-color)',
  borderRadius: '8px',
  padding: '32px',
  marginBottom: '16px',
};

const fontStyle: React.CSSProperties = {
  color: 'var(--secondary-text-color)',
};

const typoStyle: React.CSSProperties = {
  ...fontStyle,
  marginBottom: 4,
};

const labelStyle: React.CSSProperties = {
  ...fontStyle,
  fontSize: 12,
};

interface VehicleAdditionalInfoProps {
  additionalInfo?: VehicleAdditionalInfo;
}

export default function VehicleAdditionalInfoCard({
  additionalInfo,
}: VehicleAdditionalInfoProps) {
  return (
    <Box style={boxStyle}>
      <label style={labelStyle}>Fuel Type</label>
      <Typography style={typoStyle}>
        {additionalInfo?.fuelTypePrimary || '-'}
      </Typography>

      <label style={labelStyle}>Make</label>
      <Typography style={typoStyle}>{additionalInfo?.make || '-'}</Typography>

      <label style={labelStyle}>Manufacturer</label>
      <Typography style={typoStyle}>
        {additionalInfo?.manufacturer || '-'}
      </Typography>

      <label style={labelStyle}>Model</label>
      <Typography style={typoStyle}>{additionalInfo?.model || '-'}</Typography>

      <label style={labelStyle}>Year</label>
      <Typography style={typoStyle}>
        {additionalInfo?.modelYear || '-'}
      </Typography>

      <label style={labelStyle}>Vehicle Type</label>
      <Typography style={{ ...typoStyle, marginBottom: 0 }}>
        {additionalInfo?.vehicleType || '-'}
      </Typography>
    </Box>
  );
}
