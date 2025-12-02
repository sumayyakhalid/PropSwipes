import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
// utils
import { Divider } from '@mui/material';
import { fPercent, fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ReviewStatusOverview({ title, subheader, data, ...other }) {
  return (
    <Card {...other} sx={{ height: '100%' }}>
      <CardHeader title={title} subheader={subheader} />
      <Divider />
      <Stack spacing={4} sx={{ px: 3, pt: 3, pb: 5 }}>
        {data.map((progress) => (
          <ProgressItem key={progress.label} progress={progress} />
        ))}
      </Stack>
    </Card>
  );
}

ReviewStatusOverview.propTypes = {
  data: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function ProgressItem({ progress }) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>

        <Typography variant="subtitle2">{progress.totalAmount}</Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progress.value}
        color={
          (progress.label === 'Total Income' && 'info') ||
          (progress.label === 'Total Expenses' && 'warning') ||
          'primary'
        }
      />
    </Stack>
  );
}

ProgressItem.propTypes = {
  progress: PropTypes.object,
};
