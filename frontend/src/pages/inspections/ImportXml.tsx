import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import axiosClient from '../../core/api';

import { ImportProps } from './types';
import { Alert, Snackbar } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ImportXml({ onImport }: ImportProps) {
  const [showMessage, setShowMessage] = React.useState(false);

  async function importInspections(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const { files } = e.target;

      if (!files) return;

      const formData = new FormData();
      formData.append('file', files[0], files[0].name);

      await axiosClient.post('/inspections/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowMessage(true);
      onImport();
    } catch (e) {
      console.error('Error fetching inspections:', e);
    } finally {
      e.target.value = '';
    }
  }

  return (
    <div>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        style={{ marginTop: 16, background: '#daf515', color: 'black' }}
      >
        Upload
        <VisuallyHiddenInput
          type="file"
          onChange={importInspections}
          multiple
          accept=".xml"
        />
      </Button>

      <Snackbar
        open={showMessage}
        autoHideDuration={6000}
        onClose={() => setShowMessage(false)}
      >
        <Alert
          onClose={() => setShowMessage(false)}
          severity="info"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Starting import...
        </Alert>
      </Snackbar>
    </div>
  );
}
