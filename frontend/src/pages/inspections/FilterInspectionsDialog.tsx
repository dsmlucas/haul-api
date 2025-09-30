import * as React from 'react';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Dialog } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FilterListIcon from '@mui/icons-material/FilterList';

import { FilterForm } from './types';
import TextField from '../../components/form/TextField';

interface FilterProps {
  onSubmit: (form: FilterForm) => void;
  initialValues?: FilterForm;
}

export default function FilterInspectionsDialog({
  initialValues = {},
  onSubmit,
}: FilterProps) {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState<FilterForm>(initialValues);

  const onClickOpen = () => setOpen(true);
  const onClickClose = () => setOpen(false);

  const onClearFilters = () => {
    const clearedFilters = {};
    setFormValues(clearedFilters);
    onSubmit(clearedFilters);
    onClickClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value || undefined,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formValues);
    onClickClose();
  };

  return (
    <React.Fragment>
      <Tooltip title="Filters">
        <IconButton onClick={onClickOpen}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={onClickClose} style={{ minWidth: 300 }}>
        <form
          onSubmit={handleSubmit}
          style={{ backgroundColor: 'var(--base-bg-color-2)' }}
        >
          <DialogTitle style={{ color: 'var(--primary-text-color)' }}>
            Filter inspections
          </DialogTitle>

          <DialogContent sx={{ minWidth: '400px', marginTop: 4 }}>
            <Grid container spacing={2} style={{ marginBottom: '20px' }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="basic"
                  name="basic"
                  label="Violation BASIC"
                  value={formValues.basic || ''}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="code"
                  name="code"
                  label="Violation Code"
                  value={formValues.code || ''}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="licenseNumber"
                  name="licenseNumber"
                  label="Vehicle Plate"
                  value={formValues.licenseNumber || ''}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClearFilters}>Clear all filters</Button>
            <Button onClick={onClickClose}>Cancel</Button>
            <Button type="submit">Filter</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
