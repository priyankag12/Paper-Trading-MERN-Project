import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

function StatCard({ title, value, trend, data, color }) {
  const theme = useTheme();

  const trendColors = {
    up: theme.palette.success.main,
    down: theme.palette.error.main,
    neutral: theme.palette.grey[500],
  };

  const chartColor = trendColors[trend];
  const chartData = Array.isArray(data) && data.length ? data : [0];

  return (
    <Card variant="outlined" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          component="h2"
          variant="subtitle2"
          sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
          gutterBottom
        >
          {title}
        </Typography>
        <Stack
          direction="column"
          sx={{ justifyContent: 'space-between', flexGrow: 1, gap: 1 }}
        >
          <Stack sx={{ justifyContent: 'space-between' }}>
            <Stack
              direction="row"
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography
                variant="h4"
                component="p"
                sx={{ color: color }}
              >
                {value}
              </Typography>
            </Stack>
          </Stack>
          <Box sx={{ width: '100%', height: 50 }}>
            <SparkLineChart
              data={chartData}
              color={chartColor}
              showArea
              showLine
              showPoints
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['down', 'neutral', 'up']),
  data: PropTypes.arrayOf(PropTypes.number),
  color: PropTypes.string.isRequired,
};

StatCard.defaultProps = {
  data: [0],
  trend: 'neutral',
};

export default StatCard;
