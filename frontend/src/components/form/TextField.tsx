import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

interface TextFieldProps extends Omit<MuiTextFieldProps, 'variant'> {
  variant?: 'filled' | 'outlined' | 'standard';
}

export default function TextField(props: TextFieldProps) {
  const { variant = 'filled', fullWidth = true, sx, ...otherProps } = props;

  return (
    <MuiTextField
      variant={variant}
      fullWidth={fullWidth}
      sx={{
        '& .MuiFilledInput-root': {
          backgroundColor: 'var(--base-bg-color-1)',
          border: '1px solid var(--disabled-text-color)',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: 'var(--base-bg-color-1)',
            borderColor: 'var(--tertiary-text-color)',
          },
          '&.Mui-focused': {
            backgroundColor: 'var(--base-bg-color-1)',
            borderColor: 'var(--secondary-text-color)',
          },
          '&:before, &:after': {
            display: 'none',
          },
        },
        '& .MuiFilledInput-input': {
          color: 'var(--primary-text-color)',
        },
        '& .MuiInputLabel-root': {
          color: 'var(--secondary-text-color)',
          fontSize: '12px',
          '&.Mui-focused': {
            color: 'var(--primary-text-color)',
          },
        },
        ...sx,
      }}
      {...otherProps}
    />
  );
}
