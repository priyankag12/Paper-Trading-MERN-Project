import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
} from "@mui/material";
import QuizCard from "./QuizCard";
import QuizRules from "./QuizRules";
import apiClient from "../../services/apiClient";
import { convertPoints, fetchQuizQuestions } from "../../api/quizApi";
import MiniLeaderBoard from "./MiniLeaderBoard";
import { motion } from "framer-motion";

const EarnPoints = () => {
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(null);
  const [pointsLoading, setPointsLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [ranking, setRanking] = useState(null); 

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

  const handleQuizEnd = async () => {
    setShowScore(true);
    try {
      const pointsToConvert = score;
      await convertPoints(pointsToConvert);
      console.log("Points converted to balance successfully!");
      await fetchUserPoints();
    } catch (error) {
      console.error("Error converting points to balance:", error);
    }
  };

  const fetchUserPoints = async () => {
    setPointsLoading(true);
    try {
      const response = await apiClient.get("/quiz/get-points");
      setPoints(response.data.points);
      setBalance(response.data.balance); 
      setRanking(response.data.userRank);
    } catch (error) {
      console.error("Error retrieving points:", error);
    } finally {
      setPointsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPoints();
  }, []);

  return (
    <motion.div
    style={{ overflowX: "auto", maxWidth: "100%" }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      {!quizStarted ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
            width: "100%",
          }}
        >
          <Typography variant="h3" sx={{ marginBottom: 2 }}>
            Welcome to the Stock Trading Quiz!
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box sx={{ minWidth: 600 }}>
              <Card sx={{ padding: 1 }}>
                <CardContent>
                  <QuizRules />
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <Button variant="contained" onClick={startQuiz}>
                      Start Quiz
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Card sx={{ padding: 1, textAlign: "center", minWidth: 400 }}>
              <Typography variant="h4" sx={{pt:3}}> Player Details</Typography>
              <CardContent>
                {pointsLoading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <Typography variant="h5" sx={{ p:1}}>
                      Your Points: {points !== null ? points : "Error fetching points"}
                    </Typography>
                    <Typography variant="h5" sx={{ p:1}}>
                      Your Balance: {balance !== null ? balance : "Error fetching balance"}
                    </Typography>
                    <Typography variant="h5" sx={{ p:1}}>
                      Your Ranking: {ranking !== null ? ranking : "Error fetching ranking"}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Box>

          <MiniLeaderBoard />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            mt: 13,
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : showScore ? (
            <Card sx={{ padding: 4, textAlign: "center" }}>
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
              setShowScore={handleQuizEnd}
            />
          )}
        </Box>
      )}
    </Container>
    </motion.div>
  );
};

export default EarnPoints;