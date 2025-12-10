import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack } from '@mui/system';
import { RHFTextField } from 'src/components/hook-form';

export default function RejectPropertyDialog({ rejectPropertyDialog }) {
  const FormDataSchema = Yup.object().shape({
    reason: Yup.string().required('Valid Reason For Rejection is required'),
  });

  const defaultValues = {
    reason: '',
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

    rejectPropertyDialog.onFalse();
  };
  return (
    <FormProvider {...methods}>
      <Dialog
        open={rejectPropertyDialog.value}
        // onClose={lessonLearnedDialog.onFalse}
        PaperProps={{
          sx: {
            width: '60%', // or 500
            maxWidth: '70%', // controls max width on large screens
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ pb: 0 }}>Reject Listing:Add Reason</DialogTitle>
          <Typography
            Grant
            a
            selected
            subsTypography
            variant="body1"
            sx={{ pl: 3, color: '#919EAB', fontSize: '14px' }}
          >
            Provide a clear, actionable reason for the seller.
          </Typography>

          <DialogContent sx={{ mt: 1 }}>
            <Stack sx={{ mt: 2 }}>
              <RHFTextField
                name="reason"
                label="Reason"
                rows={5}
                multiline
                sx={{ borderColor: '#919EAB33' }}
              />
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
              onClick={rejectPropertyDialog.onFalse}
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
              Confirm Rejection
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
}

RejectPropertyDialog.propTypes = {
  rejectPropertyDialog: PropTypes.object,
};
