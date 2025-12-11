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
  IconButton,
  Typography,
} from '@mui/material';

import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { RHFCode } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';

export default function MultifactorAuthenticationDialog({ multifactorAuthenticationDialog }) {
  console.log('multifactorAuthenticationDialog', multifactorAuthenticationDialog);
  const FormDataSchema = Yup.object().shape({
    code: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
  });

  const defaultValues = {
    code: '',
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
    multifactorAuthenticationDialog.onFalse();
  };
  return (
    <FormProvider {...methods}>
      <Dialog
        open={multifactorAuthenticationDialog.value}
        onClose={multifactorAuthenticationDialog.onFalse}
        PaperProps={{
          sx: {
            width: '40%', // or 500
            maxWidth: '50%', // controls max width on large screens
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            sx={{
              pb: 0,
              fontSize: '24px',
              fontWeight: '700',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            MFA
            <IconButton
              onClick={multifactorAuthenticationDialog.onFalse}
              sx={{ background: 'none', border: 'none' }}
            >
              <Iconify icon="eva:close-outline" width={30} color="black" />
            </IconButton>
          </DialogTitle>
          <Typography variant="body1" sx={{ pl: 3, color: '#919EAB', fontSize: '14px' }}>
            Write the 6-digit code sent to your phone or email to enable 2-Factor Authentication.
          </Typography>

          <DialogContent sx={{ mt: 2 }}>
            <RHFCode name="code" />
          </DialogContent>

          <DialogActions
            sx={{
              flexDirection: 'row',
              gap: 1,
              px: 3,
              py: 2,
            }}
          >
            <LoadingButton
              type="submit"
              fullWidth
              loading={isSubmitting}
              loadingIndicator={<CircularProgress size={20} sx={{ color: 'white' }} />}
              sx={{
                backgroundColor: '#046AF7',
                color: 'white',
                py: 1,
                '&:hover': { backgroundColor: '#046AF7', color: 'white' },
              }}
            >
              Verify
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
}
MultifactorAuthenticationDialog.propTypes = {
  multifactorAuthenticationDialog: PropTypes.object,
};
