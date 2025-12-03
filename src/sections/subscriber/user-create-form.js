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
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
import { Divider, MenuItem, Select } from '@mui/material';
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets
import { countries } from 'src/assets/data';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
  RHFSelect,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function UserCreateForm({ currentUser }) {
  const router = useRouter();

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
      name: currentUser?.name || '',
      role: currentUser?.role || '',
      email: currentUser?.email || '',
      address: currentUser?.address || '',
      avatarUrl: currentUser?.avatarUrl || null,
      phoneNumber: currentUser?.phoneNumber || '',
    }),
    [currentUser]
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
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
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
                {!currentUser ? 'Create New User' : 'Save Changes'}
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

UserCreateForm.propTypes = {
  currentUser: PropTypes.object,
};
