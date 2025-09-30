import { CSSProperties } from 'react';

import Toolbar from '@mui/material/Toolbar';

import { TableToolbarProps } from './types';

const containerStyle: CSSProperties = { display: 'flex', color: 'red' };

export default function TableToolbar(props: TableToolbarProps) {
  const { items } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'var(--base-bg-color-2)',
        borderRadius: '8px',
      }}
    >
      <div style={containerStyle}>{items}</div>
    </Toolbar>
  );
}
