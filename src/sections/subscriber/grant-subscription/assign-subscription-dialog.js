import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';

import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack } from '@mui/system';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

export default function AssignSubscriptionDialog({ assignSubscriptionDialog, row }) {
  console.log('row', row);
  const router = useRouter();

  // Get user id from row - handle both object and array cases
  const userId = row?.id;
  console.log('userId', userId);
  const FormDataSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    plan: Yup.string().required('Plan is required'),
    periodType: Yup.string().required('Period Type is required'),
    duration: Yup.number().required('Duration is required'),
  });

  const defaultValues = {
    email: '',
    plan: '',
    periodType: '',
    duration: '',
  };

  const methods = useForm({
    resolver: yupResolver(FormDataSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  console.log('error', methods.formState.errors);

  const onSubmit = async (data) => {
    console.log('Form Data', data);

    assignSubscriptionDialog.onFalse();
    // Navigate to subscriber management page after successful submission
    if (userId) {
      router.push(paths.subscriberManagement.detail(userId));
    }
  };
  return (
    <FormProvider {...methods}>
      <Dialog
        open={assignSubscriptionDialog.value}
        onClose={assignSubscriptionDialog.onFalse}
        PaperProps={{
          sx: {
            width: '60%', // or 500
            maxWidth: '70%', // controls max width on large screens
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            sx={{
              pb: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pr: 0,
            }}
          >
            Grant Subscription
            <IconButton
              onClick={() => {
                assignSubscriptionDialog.onFalse();
                if (userId) {
                  router.push(paths.subscriberManagement.detail(userId));
                }
              }}
              sx={{ background: 'none', border: 'none', mt: -2 }}
            >
              <Iconify icon="eva:close-outline" width={30} color="#313131" />
            </IconButton>
          </DialogTitle>
          <Typography variant="body1" sx={{ pl: 3, color: '#919EAB', fontSize: '14px' }}>
            Grant a selected subscription plan to a user for a specific duration.
          </Typography>

          <Divider sx={{ mt: 1 }} />
          <DialogContent sx={{ mt: 1 }}>
            <Stack sx={{ mt: 2 }}>
              <RHFTextField name="email" label="Email Address" />

              <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr ', gap: 2 }}>
                <RHFSelect name="plan" label="Select Plan">
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <MenuItem value="buyerPro">Buyer Pro</MenuItem>
                  <MenuItem value="sellerBasic">Seller Basic</MenuItem>
                  <MenuItem value="sellerProfessional">Seller Professional</MenuItem>
                  <MenuItem value="sellerEnterprise">Seller Enterprise</MenuItem>
                </RHFSelect>
                <RHFSelect name="periodType" label="Period Type">
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </RHFSelect>{' '}
                <RHFTextField name="duration" label="Duration" />
              </Box>
            </Stack>
          </DialogContent>

          <DialogActions
            sx={{
              flexDirection: 'row',
              gap: 1,
              px: 3,
              py: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={assignSubscriptionDialog.onFalse}
              // disabled={loading}
              sx={{ borderColor: 'red', color: 'red', py: 1, width: '50%' }}
            >
              Cancel
            </Button>

            <LoadingButton
              type="submit"
              loading={isSubmitting}
              loadingIndicator={<CircularProgress size={20} sx={{ color: 'white' }} />}
              sx={{
                backgroundColor: '#046AF7',
                color: 'white',
                py: 1,
                width: '50%',
                '&:hover': { backgroundColor: '#046AF7', color: 'white' },
              }}
            >
              Grant Access
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
}

AssignSubscriptionDialog.propTypes = {
  assignSubscriptionDialog: PropTypes.object,
  row: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
