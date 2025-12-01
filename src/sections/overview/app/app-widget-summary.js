import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
// utils
import { fNumber, fPercent } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';
import Chart from 'src/components/chart';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({ title, percent, total, image, sx, ...other }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, ...sx, height: '100%' }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontSize: '14px' }}>{title}</Typography>

        <Typography sx={{ fontSize: '28px', fontWeight: 'bold' }}>{fNumber(total)}</Typography>
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
