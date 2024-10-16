import React, { useState } from "react";
import quizData from "./quizData";  // Assuming quizData is in the same directory
import { Button, Typography, Box, Card, CardContent, Stack, LinearProgress } from "@mui/material";

const EarnPoints = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  const [quizStarted, setQuizStarted] = useState(false); // Track if the quiz is started
  const [isAnswered, setIsAnswered] = useState(false); // Track if the question is answered
  const [previousSelections, setPreviousSelections] = useState([]); // Store previous selections
  
  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    setIsAnswered(true);

    // Update score if correct
    if (index === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Save the current selection to history
    setPreviousSelections((prev) => {
      const updatedSelections = [...prev];
      updatedSelections[currentQuestion] = index;
      return updatedSelections;
    });
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(previousSelections[nextQuestion] || null); // Load previous selection or reset
      setIsAnswered(!!previousSelections[nextQuestion]); // Reset answer status based on history
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
      setSelectedOption(previousSelections[prevQuestion]); // Load previous selection
      setIsAnswered(true); // Mark as answered if navigating back
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width:"100%"}}>
      {!quizStarted ? (
        <Card sx={{ minWidth: 400, padding: 4 }}>
          <CardContent>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Welcome to the Stock Trading Quiz!</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Rules:
              <ul>
                <li>Each question has four options (A, B, C, D).</li>
                <li>You earn a point for each correct answer.</li>
                <li>No points are deducted for incorrect answers.</li>
                <li>Answers are processed immediately after selection.</li>
                <li>You can navigate back to previous questions.</li>
              </ul>
            </Typography>
            <Button variant="contained" onClick={startQuiz}>Start Quiz</Button>
          </CardContent>
        </Card>
      ) : showScore ? (
        <Card sx={{ padding: 4 }}>
          <Typography variant="h4">You scored {score} out of {quizData.length}</Typography>
        </Card>
      ) : (
        <Card sx={{ minWidth: 400, padding: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Question {currentQuestion + 1}/{quizData.length}: {quizData[currentQuestion].question}
            </Typography>

            {/* Progress bar */}
            <LinearProgress 
              variant="determinate" 
              value={((currentQuestion + 1) / quizData.length) * 100} 
              sx={{ marginBottom: 3 }} 
            />

            <Stack direction="column" spacing={2}>
              {quizData[currentQuestion].choices.map((choice, index) => (
                <Button
                  key={index}
                  variant="contained"
                  fullWidth
                  onClick={() => handleOptionClick(index)}
                  sx={{ 
                    textTransform: 'none', 
                    backgroundColor: 
                      isAnswered 
                        ? index === quizData[currentQuestion].correctAnswer 
                          ? "green" 
                          : index === selectedOption 
                            ? "red" 
                            : "" 
                        : "" // Highlight the correct choice and selected wrong choice
                  }}
                  disabled={isAnswered} // Disable other options after selection
                >
                  {String.fromCharCode(65 + index)}. {choice}
                </Button>
              ))}
            </Stack>

            <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'space-between' }}>
              {/* Previous Question Button */}
              {currentQuestion > 0 && (
                <Button 
                  variant="outlined" 
                  onClick={handlePreviousQuestion}
                >
                  Previous Question
                </Button>
              )}

              {/* Next Question Button */}
              {isAnswered && (
                <Button 
                  variant="outlined" 
                  onClick={handleNextQuestion}
                >
                  Next Question
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default EarnPoints;
