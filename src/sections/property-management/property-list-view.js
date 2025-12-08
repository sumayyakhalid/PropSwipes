import isEqual from 'lodash/isEqual';
import { useState, useCallback } from 'react';
// @mui
import Container from '@mui/material/Container';
import { Grid, Typography } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { _userList } from 'src/_mock';
import { TablePaginationCustom, useTable } from 'src/components/table';
import UserPropertyListing from '../subscriber/view/user-property-listing';
import PropertyTableToolbar from './property-table-toolbar';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  {
    value: 'all',
    label: 'All',
    icon: <img src="/assets/icons/dashboard/filter.svg" alt="filter status" />,
  },
  {
    value: 'Pending',
    label: 'Pending',
  },
  {
    value: 'Approved',
    label: 'Approved',
  },
  {
    value: 'Blocked',
    label: 'Blocked',
  },
];

const defaultFilters = {
  name: '',
  status: 'all',
};

// ----------------------------------------------------------------------

export default function PropertyListView() {
  const settings = useSettingsContext();
  const table = useTable({ defaultRowsPerPage: 6 });

  const [filters, setFilters] = useState(defaultFilters);

  const allPropertyListings = _userList.map((user) => user.listings).flat();
  const dataFiltered = applyFilter({
    inputData: allPropertyListings,
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Property Management"
        links={[
          {
            name: 'Property List',
            href: paths.propertyManagement.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <PropertyTableToolbar
        filters={filters}
        onFilters={handleFilters}
        statusOptions={STATUS_OPTIONS}
      />
      <Grid container spacing={2} sx={{ px: 1, pb: 2.5 }}>
        {!notFound ? (
          dataInPage.map((listing, index) => (
            <Grid key={`${listing.id}-${index}`} xs={12} md={3.8} sx={{ m: 0.5, mx: 'auto' }}>
              <UserPropertyListing listings={[listing]} />
            </Grid>
          ))
        ) : (
          <Grid xs={12}>
            <Typography variant="body2" sx={{ color: '#919EAB', textAlign: 'center', py: 4 }}>
              No listings found.
            </Typography>
          </Grid>
        )}
      </Grid>
      <TablePaginationCustom
        count={dataFiltered.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        rowsPerPageOptions={[6, 12, 24]}
      />
    </Container>
  );
}

function applyFilter({ inputData, filters }) {
  const { name, status } = filters;

  let filteredData = [...inputData];

  // Filter by name (search in title)
  if (name) {
    filteredData = filteredData.filter(
      (listing) => listing.title?.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  // Filter by status - exact match (Pending, Approved, or all)
  if (status && status !== 'all') {
    filteredData = filteredData.filter((listing) => listing.status === status);
  }

  return filteredData;
}
