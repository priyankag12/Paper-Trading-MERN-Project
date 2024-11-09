
import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography, Stack, LinearProgress, useTheme } from "@mui/material";

const QuizCard = ({ questions, score, setScore, setShowScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [previousSelections, setPreviousSelections] = useState([]);
  const theme = useTheme();

  const handleOptionClick = (index) => {
    setSelectedOption(index);

    // Update previous selections to allow changing the selection
    setPreviousSelections((prev) => {
      const updatedSelections = [...prev];
      updatedSelections[currentQuestion] = index;
      return updatedSelections;
    });
  };

  const handleNextQuestion = () => {
    // Check answer only when proceeding to the next question
    if (previousSelections[currentQuestion] === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(previousSelections[currentQuestion + 1] || null);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(previousSelections[currentQuestion - 1] || null);
    }
  };

  return (
    <Card 
      sx={{ 
        width: 700, 
        height: 400, 
        padding: 4, 
        overflow: 'hidden', 
        borderRadius: 4,
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Question {currentQuestion + 1}/{questions.length}: {questions[currentQuestion].question}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={((currentQuestion + 1) / questions.length) * 100}
          sx={{ 
            marginBottom: 3, 
            bgcolor: theme.palette.grey[700], 
            '& .MuiLinearProgress-bar': {
              bgcolor: theme.palette.accent.main, 
            },
          }} 
        />

        <Stack direction="column" spacing={2}>
          {questions[currentQuestion].options.map((choice, index) => (
            <Button
              key={index}
              variant="contained"
              fullWidth
              onClick={() => handleOptionClick(index)}
              sx={{
                textTransform: "none",
                backgroundColor: selectedOption === index ? theme.palette.primary.light : "",
              }}
            >
              {String.fromCharCode(65 + index)}. {choice}
            </Button>
          ))}
        </Stack>

        <Box sx={{ marginTop: 3, display: "flex", justifyContent: "space-between" }}>
          {currentQuestion > 0 && <Button variant="outlined" onClick={handlePreviousQuestion} sx={{ backgroundColor:theme.palette.accent.main, color:'white'}}>Previous Question</Button>}
          <Button variant="outlined" onClick={handleNextQuestion} sx={{ backgroundColor:theme.palette.accent.main, color:'white'}}>Next Question</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuizCard;