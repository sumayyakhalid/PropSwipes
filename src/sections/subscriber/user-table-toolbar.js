import PropTypes from 'prop-types';
import { useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
// components
import { Box } from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ filters, onFilters, statusOptions }) {
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleFilterRole = useCallback(
    (event) => {
      // Single-select: status is a simple string value like 'active' | 'pending' | 'all'
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
        <Select
          value={filters.status}
          onChange={handleFilterRole}
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 240 },
            },
          }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Box display="flex" alignItems="center" gap={1}>
                {option.icon} {option.label}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ width: { xs: 1, md: 'auto' } }}>
        <TextField
          // fullWidth
          value={filters.name}
          onChange={handleFilterName}
          placeholder="Search by Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
}

UserTableToolbar.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  statusOptions: PropTypes.array,
};
