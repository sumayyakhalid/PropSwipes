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
import AppWidgetSummary from '../app-widget-summary';
import AnalyticsCurrentVisits from '../../analytics/analytics-current-visits';
import ReviewStatusOverview from '../../e-commerce/ecommerce-sales-overview';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4">Analytics & Oversight</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={12} md={2.4}>
          <AppWidgetSummary
            title="Total Users"
            percent={2.6}
            total={190}
            image={<img src="/assets/icons/dashboard/total_users.svg" alt="users" />}
          />
        </Grid>

        <Grid xs={12} md={2.4}>
          <AppWidgetSummary
            title="Total Property Listings"
            percent={0.2}
            total={12}
            image={
              <img
                src="/assets/icons/dashboard/total_property.svg"
                alt="property"
                width={35}
                height={35}
              />
            }
          />
        </Grid>

        <Grid xs={12} md={2.4}>
          <AppWidgetSummary
            title="Pending Listings"
            percent={-0.1}
            total={700}
            image={
              <img
                src="/assets/icons/dashboard/pending_listing.svg"
                alt="pending listing"
                width={35}
                height={35}
              />
            }
          />
        </Grid>
        <Grid xs={12} md={2.4}>
          <AppWidgetSummary
            title="Active Subscriptions"
            percent={-0.1}
            total={678}
            image={
              <img
                src="/assets/icons/dashboard/active_subscriptions.svg"
                alt="active subscription"
                width={35}
                height={35}
              />
            }
          />
        </Grid>
        <Grid xs={12} md={2.4}>
          <AppWidgetSummary
            title="Suspended Acounts"
            percent={-0.1}
            total={678}
            image={
              <img
                src="/assets/icons/dashboard/suspended_acount.svg"
                alt="suspended account"
                width={30}
                height={30}
              />
            }
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Subscription Distribution"
            chart={{
              series: [
                { label: 'Free', value: 4344 },
                { label: 'Buyer Pro', value: 5435 },
                { label: 'Seller Basic', value: 1443 },
                { label: 'Seller Professional', value: 4443 },
                { label: 'Seller Enterprise', value: 4443 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8} sx={{ height: '100%', bgColor: 'red' }}>
          <ReviewStatusOverview title="Listing Overview Status" data={_reviewStatusOverview} />
        </Grid>
      </Grid>
    </Container>
  );
}
