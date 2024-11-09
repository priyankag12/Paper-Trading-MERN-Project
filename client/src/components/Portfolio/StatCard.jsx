import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Stack, useTheme } from '@mui/material';

function StatCard({ title, value }) {
  const theme = useTheme();
  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1, border: `1px solid ${theme.palette.accent.main}`, }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="p">
            {value}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default StatCard;