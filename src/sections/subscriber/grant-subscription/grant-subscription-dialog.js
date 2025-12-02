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
  MenuItem,
  Typography,
} from '@mui/material';

import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack } from '@mui/system';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';

export default function GrantSubscriptionDialog({ grantSubscriptionDialog }) {
  const FormDataSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    plan: Yup.string().required('Plan is required'),
    type: Yup.string().required('Period Type is required'),
    duration: Yup.number().required('Duration is required'),
  });

  const defaultValues = {
    email: '',
    plan: '',
    type: '',
    duration: '',
  };

  const methods = useForm({
    resolver: yupResolver(FormDataSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  console.log('error', methods.formState.errors);

  const onSubmit = async (data) => {
    console.log('Form Data', data);

    grantSubscriptionDialog.onFalse();
  };
  return (
    <FormProvider {...methods}>
      <Dialog
        open={grantSubscriptionDialog.value}
        // onClose={lessonLearnedDialog.onFalse}
        PaperProps={{
          sx: {
            width: '60%', // or 500
            maxWidth: '70%', // controls max width on large screens
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Grant Subscription</DialogTitle>
          <Typography variant="body1">
            Grant a selected subscription plan to a user for a specific duration.
          </Typography>

          <DialogContent>
            <Stack sx={{ mt: 2 }}>
              <RHFTextField name="email" label="Email Address" />

              <Box sx={{ mt: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr ', gap: 2 }}>
                <RHFSelect name="plan" label="Plan">
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
              alignItems: 'stretch',
            }}
          >
            <Button
              variant="outlined"
              onClick={grantSubscriptionDialog.onFalse}
              // disabled={loading}
              sx={{ borderColor: 'success.main', color: 'success.main', py: 1 }}
            >
              Cancel
            </Button>

            <LoadingButton
              type="submit"
              loading={isSubmitting}
              loadingIndicator={<CircularProgress size={20} sx={{ color: 'white' }} />}
              sx={{
                backgroundColor: '#78C217',
                color: 'white',
                py: 1,
                '&:hover': { backgroundColor: '#78C217', color: 'white' },
              }}
            >
              Generate Lesson Learned Template
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
}

GrantSubscriptionDialog.propTypes = {
  grantSubscriptionDialog: PropTypes.object,
};
