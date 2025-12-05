import PropTypes from 'prop-types';
import { useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
// components
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function PropertyTableToolbar({ filters, onFilters, statusOptions }) {
  const handleFilterStatus = useCallback(
    (event) => {
      onFilters('status', event.target.value);
    },
    [onFilters]
  );

  return (
    <Stack
      spacing={2}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        p: 2.5,
        pr: { xs: 2.5, md: 1 },
        justifyContent: { md: 'flex-end' },
      }}
    >
      <FormControl
        sx={{
          flexShrink: 0,
          width: { xs: 1, md: 200 },
          ml: { md: 'auto' },
        }}
      >
        <InputLabel id="status-filter-label">Filter by Status</InputLabel>
        <Select
          labelId="status-filter-label"
          id="status-filter"
          value={filters.status || 'all'}
          label="Filter by Status"
          onChange={handleFilterStatus}
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 240 },
            },
          }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Box display="flex" alignItems="center" gap={1}>
                {option.icon && option.icon} {option.label}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}

PropertyTableToolbar.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  statusOptions: PropTypes.array,
};
