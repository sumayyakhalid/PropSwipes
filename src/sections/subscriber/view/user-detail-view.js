import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// utils
import { Divider, MenuItem } from '@mui/material';
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFUploadAvatar, RHFSelect } from 'src/components/hook-form';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { _userList } from 'src/_mock';

// ----------------------------------------------------------------------

export default function UserDetailPage({ currentUser }) {
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

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <CustomBreadcrumbs
        heading="Acount Overview"
        links={[
          {
            name: 'Subscriber Management',
            href: paths.subscriberManagement.root,
          },

          { name: 'User Profile Detials' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="phoneNumber" label="Phone Number" />
              <RHFSelect name="role" label="Role">
                <Divider sx={{ borderStyle: 'dashed' }} />
                <MenuItem value="buyer">Buyer</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
                <MenuItem value="broker">Broker</MenuItem>
                <MenuItem value="investor">Inverstor</MenuItem>
                <MenuItem value="rentor">Rentor</MenuItem>
                <MenuItem value="landlord">Landlord</MenuItem>
              </RHFSelect>
            </Box>
            <RHFTextField name="address" label="Address" sx={{ mt: 2 }} />

            <Stack sx={{ mt: 3, width: '100%' }}>
              <LoadingButton
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#046AF7',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#046AF7' },
                }}
                loading={isSubmitting}
              >
                {!userDetail ? 'Create New User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
        <Grid xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

UserDetailPage.propTypes = {
  currentUser: PropTypes.object,
};
