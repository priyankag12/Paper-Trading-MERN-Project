import React from 'react';
import { Typography, Box } from '@mui/material';

const QuizRules = () => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h5">Quiz Rules:</Typography>
      <ul>
        <li><Typography variant="body1">Each question has multiple-choice answers.</Typography></li>
        <li><Typography variant="body1">You have a limited time to answer each question.</Typography></li>
        <li><Typography variant="body1">Correct answers will earn you points!</Typography></li>
        <li><Typography variant="body1">Try to answer as many questions as possible.</Typography></li>
      </ul>
    </Box>
  );
};

export default QuizRules;