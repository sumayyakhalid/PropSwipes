import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// utils
import { Avatar, Button, Divider } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// components
import { useSnackbar } from 'src/components/snackbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { _userList } from 'src/_mock';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import Label from 'src/components/label';
import AppWidgetSummary from 'src/sections/overview/app/app-widget-summary';
import UserPropertyListing from './user-property-listing';

// ----------------------------------------------------------------------

export default function UserDetailPage({ currentUser, assignSubscriptionDialog }) {
  console.log('currentUser', currentUser); // id
  const router = useRouter();

  const userDetail = _userList.find((user) => user.id === currentUser);
  console.log('userDetail', userDetail);
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    role: Yup.string().required('Role is required'),
    address: Yup.string().required('Address is required'),
    avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: userDetail?.name || '',
      role: userDetail?.role || '',
      email: userDetail?.email || '',
      address: userDetail?.address || '',
      avatarUrl: userDetail?.avatarUrl || null,
      phoneNumber: userDetail?.phoneNumber || '',
    }),
    [userDetail]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('data', data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(userDetail ? 'Update success!' : 'Create success!');
      router.push(paths.subscriberManagement.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <CustomBreadcrumbs
        heading="Acount Overview"
        links={[
          {
            name: 'Subscriber Management',
            href: paths.subscriberManagement.root,
          },

          { name: 'User Profile Detials' },
        ]}
        action={
          <Button
            component={RouterLink}
            onClick={() => {
              assignSubscriptionDialog.onTrue();
            }}
            variant="contained"
            sx={{
              backgroundColor: '#046AF7',
              color: '#fff',
              '&:hover': { backgroundColor: '#046AF7' },
            }}
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Grant Subscription
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {/* user detail */}
      <Grid
        container
        spacing={3}
        sx={{
          background: 'white',
          borderRadius: 2,
          m: 2,
          boxShadow: '0px 0px 10px rgba(0,0,0,0.05)',
        }}
      >
        <Grid xs={12} md={4}>
          <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
            <Box>
              <Avatar
                src={userDetail?.avatarUrl}
                sx={{ width: 55, height: 55, border: '1px solid white' }}
              />
            </Box>
            <Box>
              <Label variant="soft" color="success">
                Active
              </Label>
              <Typography variant="h6">{userDetail?.name}</Typography>
              <Typography variant="body1" sx={{ fontSize: 14, color: '#919EAB' }}>
                <span style={{ fontWeight: 'bold' }}>Current Plan:</span>
                {userDetail?.plan}
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'red' }}>(Expires: 12 jan, 2026)</Typography>

              <Typography variant="body1" sx={{ fontSize: 14, color: '#919EAB' }}>
                <span style={{ fontWeight: 'bold' }}>Registered Role:</span>
                {userDetail?.role}
              </Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid xs={12} md={4} sx={{ my: 2 }}>
          <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              <img src="/assets/icons/dashboard/profile.svg" alt="user" width={12} height={12} />
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', fontSize: 14, color: '#919EAB', width: '5rem' }}
              >
                Name
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontSize: 14, color: 'black' }}>
                {userDetail?.name}
              </Typography>
            </Box>
          </Stack>
          <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <img src="/assets/icons/dashboard/email.svg" alt="user" width={12} height={12} />
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', fontSize: 14, color: '#919EAB', width: '5rem' }}
              >
                Email
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontSize: 14, color: 'black' }}>
                {userDetail?.email}
              </Typography>
            </Box>
          </Stack>
          <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <img src="/assets/icons/dashboard/location.svg" alt="user" width={12} height={12} />

              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', fontSize: 14, color: '#919EAB', width: '5rem' }}
              >
                Zip Code
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontSize: 14, color: 'black' }}>
                123456
              </Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid xs={12} md={4} sx={{ my: 2 }}>
          <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <img src="/assets/icons/dashboard/call.svg" alt="user" width={12} height={12} />
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', fontSize: 14, color: '#919EAB', width: '7rem' }}
              >
                Phone Number
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontSize: 14, color: 'black' }}>
                0123456789
              </Typography>
            </Box>
          </Stack>
          <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <img src="/assets/icons/dashboard/location.svg" alt="user" width={12} height={12} />

              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', fontSize: 14, color: '#919EAB', width: '7rem' }}
              >
                City
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontSize: 14, color: 'black' }}>
                Karachi
              </Typography>
            </Box>
          </Stack>
          <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2, alignItems: 'start' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <img src="/assets/icons/dashboard/location.svg" alt="user" width={12} height={12} />

              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', fontSize: 14, color: '#919EAB', width: '7.8rem' }}
              >
                Address
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontSize: 14, color: 'black' }}>
                19034 Verna Unions Apt. 164 - Honolulu, RI / 87535
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      {/* user report cards */}

      <Grid
        container
        spacing={3}
        sx={{
          background: 'white',
          borderRadius: 2,
          m: 1,
        }}
      >
        <Grid xs={12} md={12} lg={4}>
          <AppWidgetSummary
            title="Total Swipes"
            percent={2.6}
            total={43}
            image={<img src="/assets/icons/dashboard/swipe.svg" alt="total swipes" />}
          />
        </Grid>
        <Grid xs={12} md={4} lg={4}>
          <AppWidgetSummary
            title="Total Matches"
            percent={2.6}
            total={30}
            image={<img src="/assets/icons/dashboard/likes.svg" alt="total matches" />}
          />
        </Grid>
        <Grid xs={12} md={4} lg={4}>
          <AppWidgetSummary
            title="Total Report Received"
            percent={2.6}
            total={5}
            image={<img src="/assets/icons/dashboard/suspended.png" alt="suspended acounts" />}
          />
        </Grid>
      </Grid>

      {/* user listing */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: 16, color: '#111827', mb: 2 }}>
          User Listing
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          {userDetail?.listings && userDetail.listings.length > 0 ? (
            userDetail.listings.map((listing) => (
              <Grid key={listing.id} xs={12} md={4}>
                <UserPropertyListing listings={[listing]} />
              </Grid>
            ))
          ) : (
            <Grid xs={12}>
              <Typography variant="body2" sx={{ color: '#919EAB', textAlign: 'center', py: 4 }}>
                No listings found for this user.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

UserDetailPage.propTypes = {
  currentUser: PropTypes.object,
  assignSubscriptionDialog: PropTypes.object,
};
