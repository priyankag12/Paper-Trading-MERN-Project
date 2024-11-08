import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function StatCard({ title, value, trend }) {
  const theme = useTheme();

  const trendColors = {
    up: theme.palette.success.main,
    down: theme.palette.error.main,
    neutral: theme.palette.grey[900],
  };

  const labelColors = {
    up: 'success',
    down: 'error',
    neutral: 'default',
  };

  const color = labelColors[trend];
  const chartColor = trendColors[trend];
  const trendValues = { up: '+25%', down: '-25%', neutral: '0%' };

  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
      <CardContent>
        <Typography
          component="h2"
          variant="subtitle2"
          sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
          gutterBottom
        >
          {title}
        </Typography>
        <Stack direction="column" sx={{ gap: 1 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography
              variant="h4"
              component="p"
              sx={{ fontWeight: 'bold', color: chartColor }}
            >
              {value}
            </Typography>
            <Chip size="small" color={color} label={trendValues[trend]} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['down', 'neutral', 'up']).isRequired,
};

export default StatCard;

