import { Typography } from '@mui/material';

const boxStyle: React.CSSProperties = {
  background: 'var(--base-bg-color-1)',
  border: '1px solid var(--disabled-text-color)',
  borderRadius: '4px',
  padding: '8px',
};

const fontStyle: React.CSSProperties = {
  color: 'var(--secondary-text-color)',
};

interface TextFieldProps {
  label: string;
  value: string;
}

export default function DisplayField(props: TextFieldProps) {
  return (
    <div style={boxStyle}>
      <label style={{ ...fontStyle, fontSize: 12 }}>{props.label}</label>
      <Typography style={fontStyle}>{props.value}</Typography>
    </div>
  );
}
