// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
import { Typography } from '@mui/material';
import { useMockedUser } from 'src/hooks/use-mocked-user';
// _mock
import { _reviewStatusOverview } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function SubscriberManagementView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4">Subsriber List</Typography>
    </Container>
  );
}
