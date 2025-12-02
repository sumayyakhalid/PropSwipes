// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import UserCreateForm from '../user-create-form';
//

// ----------------------------------------------------------------------

export default function UserCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create New Subscriber"
        links={[
          {
            name: 'Subscriber List',
            href: paths.dashboard.subscriberManagement.root,
          },

          { name: 'Create New Subscriber' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserCreateForm />
    </Container>
  );
}
