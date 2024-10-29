import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { fetchQuizQuestions } from "../../api/quizApi";
import QuizCard from "./QuizCard";
import QuizRules from "./QuizRules";

const EarnPoints = () => {
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const startQuiz = async () => {
    setLoading(true);
    try {
      const fetchedQuestions = await fetchQuizQuestions();
      setQuestions(fetchedQuestions);
      setQuizStarted(true);
    } catch (error) {
      console.error("Failed to load quiz questions: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
      {!quizStarted ? (
        <Card sx={{ minWidth: 400, padding: 4 }}>
          <CardContent>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Welcome to the Stock Trading Quiz!
            </Typography>
            <QuizRules />
            <Button variant="contained" onClick={startQuiz}>
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      ) : loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
          <CircularProgress />
        </Box>
      ) : showScore ? (
        <Card
          sx={{
            padding: 4,
            width: 700,
            height: 400,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">
            You scored {score} out of {questions.length}
          </Typography>
          <Box sx={{ margin: 4 }}>
            <Button
              variant="contained"
              onClick={() => {
                setQuizStarted(false);
                setScore(0);
                setShowScore(false);
                setQuestions([]);
              }}
              sx={{
                color: "white"
              }}
            >
              Play Again
            </Button>
          </Box>
        </Card>
      ) : (
        <QuizCard
          questions={questions}
          score={score}
          setScore={setScore}
          setShowScore={setShowScore}
        />
      )}
    </Box>
  );
};

export default EarnPoints;