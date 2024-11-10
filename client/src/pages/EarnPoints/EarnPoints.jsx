import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  CircularProgress,
  Card,
  CardContent,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import QuizCard from "../../components/Quiz/QuizCard";
import QuizRules from "../../components/Quiz/QuizRules";
import {
  convertPoints,
  fetchQuizQuestions,
  getUserDetails,
} from "../../api/quizApi";
import MiniLeaderBoard from "../../components/Quiz/MiniLeaderBoard";
import { motion } from "framer-motion";
import UserInfo from "../../components/Quiz/UserInfo";

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
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const theme = useTheme();

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
      await fetchUserDetails();
      setSnackbarOpen(true); 
    } catch (error) {
      console.error("Error converting points to balance:", error);
    }
  };

  const fetchUserDetails = async () => {
    setPointsLoading(true);
    try {
      const response = await getUserDetails();
      setPoints(response.data.points);
      setBalance(Number(response.data.balance).toFixed(2));
      setRanking(response.data.userRank);
    } catch (error) {
      console.error("Error retrieving points:", error);
    } finally {
      setPointsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
            <Typography
              variant="h3"
              sx={{
                marginBottom: 2,
                textAlign: "center",
              }}
            >
              Test Your Market Knowledge!
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-around",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box sx={{ width: { xs: "100%", md: 600 } }}>
                <Card
                  sx={{
                    borderRadius: 4,
                    padding: 2,
                    border: `1px solid ${theme.palette.accent.main}`,
                  }}
                >
                  <CardContent>
                    <QuizRules />
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                    >
                      <Button
                        variant="contained"
                        onClick={startQuiz}
                        sx={{
                          backgroundColor: theme.palette.accent.main,
                          color: theme.palette.primary.contrastText,
                          fontWeight: "bold",
                          paddingX: 3,
                          paddingY: 1.5,
                          borderRadius: 2,
                          transition: "transform 0.5s ease",
                          boxShadow: `0px 4px 10px 2px${theme.palette.accent.main}`,
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: `0px 7px 12px 2px ${theme.palette.accent.main}`,
                          },
                        }}
                      >
                        Start Quiz
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ width: { xs: "100%", md: 400 } }}>
                <UserInfo
                  points={points}
                  balance={balance}
                  ranking={ranking}
                  pointsLoading={pointsLoading}
                />
              </Box>
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
              padding: { xs: 2, md: 0 },
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Points converted and added to your account successfully!
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default EarnPoints;