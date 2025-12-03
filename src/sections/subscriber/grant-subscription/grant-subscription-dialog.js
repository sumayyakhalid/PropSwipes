import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
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
import { enqueueSnackbar } from 'notistack';
import { RHFCheckbox, RHFSelect, RHFTextField } from 'src/components/hook-form';
import { _userList } from 'src/_mock';
import Iconify from 'src/components/iconify';

export default function GrantSubscriptionDialog({ grantSubscriptionDialog }) {
  const FormDataSchema = Yup.object().shape({
    plan: Yup.string().required('Plan is required'),
    periodType: Yup.string().required('Period Type is required'),
    duration: Yup.number().required('Duration is required'),
    selectedFlags: Yup.array().of(Yup.boolean()),
  });

  const defaultValues = {
    plan: '',
    periodType: '',
    duration: '',
    selectedFlags: _userList.map(() => false),
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
    console.log('selectedFlags', data.selectedFlags);
    const selectedUsers = data.selectedFlags
      .map((flag, index) => (flag ? _userList[index] : null))
      .filter(Boolean);

    data.selectedUsers = selectedUsers;
    console.log('selectedUsers', data);
    grantSubscriptionDialog.onFalse();
    enqueueSnackbar('Subscription granted successfully', { variant: 'success' });
  };
  return (
    <FormProvider {...methods}>
      <Dialog
        open={grantSubscriptionDialog.value}
        onClose={grantSubscriptionDialog.onFalse}
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pr: 0,
            }}
          >
            Grant Subscription
            <IconButton
              onClick={grantSubscriptionDialog.onFalse}
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

            {/* slect multiple user for subscription  */}
            {_userList.map((user, index) => (
              <>
                <Divider sx={{ mt: 2 }} />
                <Stack sx={{ my: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'space-between',
                      gap: 2,

                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={user?.avatarUrl} sx={{ width: 56, height: 56 }} />
                      <Box>
                        <Typography variant="subtitle1">{user?.name}</Typography>
                        <Typography variant="body1">{user?.email}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      {' '}
                      <RHFCheckbox
                        name={`selectedFlags.${index}`}
                        sx={{
                          width: 24,
                          height: 24,

                          // checked state fix for RHFCheckbox
                          '& .MuiCheckbox-root.Mui-checked .MuiSvgIcon-root': {
                            color: '#046AF7 !important',
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Stack>
              </>
            ))}
            <Divider />
            {/* avatar  */}
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
              onClick={grantSubscriptionDialog.onFalse}
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

GrantSubscriptionDialog.propTypes = {
  grantSubscriptionDialog: PropTypes.object,
  rejectSubscriptionDialog: PropTypes.object,
};
