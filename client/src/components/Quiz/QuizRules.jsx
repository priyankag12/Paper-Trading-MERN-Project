import React from 'react';
import { Typography, Box, List, ListItem } from '@mui/material';

const QuizRules = () => {
  return (
    <Box sx={{ marginBottom: 2, textAlign: 'center' }}>
      <Typography variant="h4" >Quiz Rules:</Typography>
      <List >
        <ListItem sx={{ justifyContent: 'center', p:0 }}><Typography variant="h6">Each question has multiple-choice answers.</Typography></ListItem>
        <ListItem sx={{ justifyContent: 'center', p:0 }}><Typography variant="h6">You have a limited time to answer each question.</Typography></ListItem>
        <ListItem sx={{ justifyContent: 'center', p:0 }}><Typography variant="h6">Correct answers will earn you points!</Typography></ListItem>
        <ListItem sx={{ justifyContent: 'center', p:0 }}><Typography variant="h6">Try to answer as many questions as possible.</Typography></ListItem>
      </List>
    </Box>
  );
};

export default QuizRules;