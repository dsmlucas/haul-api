import {
  Box,
  LinearProgress,
  Typography,
  LinearProgressProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface ProgressBarProps extends Omit<LinearProgressProps, 'variant'> {
  value?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'determinate' | 'indeterminate';
  size?: 'small' | 'medium' | 'large';
}

const StyledLinearProgress = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 4,
  padding: '4px',
  margin: '8px 0',
  backgroundColor: 'var(--disabled-text-color)',

  '&.size-small': {
    height: 4,
  },
  '&.size-medium': {
    height: 8,
  },
  '&.size-large': {
    height: 12,
  },

  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    backgroundColor: 'var(--secondary-text-color)',
  },

  '&.color-primary .MuiLinearProgress-bar': {
    backgroundColor: 'var(--secondary-text-color)',
  },
}));

const ProgressContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const ProgressHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const ProgressLabel = styled(Typography)({
  color: 'var(--primary-text-color)',
  fontSize: '14px',
  fontWeight: 500,
});

const ProgressPercentage = styled(Typography)({
  color: 'var(--secondary-text-color)',
  fontSize: '12px',
  fontWeight: 400,
});

export default function ProgressBar({
  value = 0,
  label,
  showPercentage = true,
  variant = 'determinate',
  size = 'medium',
  sx,
  ...otherProps
}: ProgressBarProps) {
  const hasHeader = label || (showPercentage && variant === 'determinate');

  return (
    <ProgressContainer sx={sx}>
      {hasHeader && (
        <ProgressHeader>
          {label && <ProgressLabel>{label}</ProgressLabel>}
          {showPercentage && variant === 'determinate' && (
            <ProgressPercentage>{Math.round(value)}%</ProgressPercentage>
          )}
        </ProgressHeader>
      )}

      <StyledLinearProgress
        variant={variant}
        value={value}
        className={`size-${size} color-primary`}
        {...otherProps}
      />
    </ProgressContainer>
  );
}
