import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// auth
import { useAuthContext } from 'src/auth/hooks';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgGradient } from 'src/theme/css';
// components
import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

const METHODS = [
  {
    id: 'jwt',
    label: 'Jwt',
    path: paths.auth.jwt.login,
    icon: '/assets/icons/auth/ic_jwt.svg',
  },
  {
    id: 'firebase',
    label: 'Firebase',
    path: paths.auth.firebase.login,
    icon: '/assets/icons/auth/ic_firebase.svg',
  },
  {
    id: 'amplify',
    label: 'Amplify',
    path: paths.auth.amplify.login,
    icon: '/assets/icons/auth/ic_amplify.svg',
  },
  {
    id: 'auth0',
    label: 'Auth0',
    path: paths.auth.auth0.login,
    icon: '/assets/icons/auth/ic_auth0.svg',
  },
];

export default function AuthClassicLayout({ children, image, title, hideRightSection = false }) {
  const { method } = useAuthContext();

  const theme = useTheme();

  const upMd = useResponsive('up', 'md');

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        backgroundImage: hideRightSection
          ? 'none'
          : `url('/assets/illustrations/illustration_dashboard.jpg')`,
        maxWidth: 480,

        px: { xs: 0.5, md: 1 },
        py: { xs: 15, md: 13, lg: 'auto' },
        backgroundColor: 'white',
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={0.8}
      alignItems="center"
      justifyContent="center"
      spacing={10}
      sx={{
        borderRadius: '10px',
        margin: '2rem',
        backgroundColor: '#016BFF',
      }}
    >
      <Box
        component="img"
        alt="auth"
        src={image || '/assets/illustrations/propState_logo.png'}
        sx={{ maxWidth: 200 }}
      />
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        backgroundImage: hideRightSection
          ? `url('/assets/illustrations/illustration_dashboard.jpg')`
          : 'none',

        backgroundColor: 'white',
      }}
    >
      {renderContent}
      {upMd && !hideRightSection && renderSection}
    </Stack>
  );
}

AuthClassicLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
  hideRightSection: PropTypes.bool,
};
