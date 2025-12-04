import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Link } from '@mui/material';
// utils
import { fNumber } from 'src/utils/format-number';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({ title, percent, total, image, sx, ...other }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, ...sx, height: '100%' }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontSize: '14px' }}>{title}</Typography>

        <Typography sx={{ fontSize: '28px', fontWeight: 'bold' }}>{fNumber(total)}</Typography>
        {title === 'Total Report Received' && (
          <Link
            href={paths.dashboard}
            sx={{ color: 'red', fontSize: '14px', textDecoration: 'underline' }}
          >
            View Report
          </Link>
        )}
      </Box>

      {image}
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  image: PropTypes.object,
  percent: PropTypes.number,
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
