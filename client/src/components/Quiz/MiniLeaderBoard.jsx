import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { fetchLeaderBoard } from "../../api/quizApi";

const MiniLeaderBoard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const getLeaderBoard = async () => {
      try {
        setIsLoading(true);
        const response = await fetchLeaderBoard();
        const rankedData = (response?.data?.ranking || []).map((item, index) => ({
          ...item,
          index: index + 1,
        })).slice(0, 5);

        setLeaderboard(rankedData || []);
      } catch (error) {
        console.error("Error fetching leaderboard: ", error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getLeaderBoard();
  }, []);

  return (
    <motion.div
      style={{ overflowX: "auto", maxWidth: "100%" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        Leaderboard Top 5 
      </Typography>
      <Box sx={{ width: "100%", minWidth: 300 }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={3}>
            <CircularProgress />
          </Box>
        ) : leaderboard.length > 0 ? (
          <TableContainer component={Paper} sx={{ boxShadow: 4, borderRadius: 2 }}>
            <Table sx={{ minWidth: 300 }} aria-label="leaderboard table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Ranking</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      "&:hover": { backgroundColor: theme.palette.primary.dark },
                    }}
                  >
                    <TableCell align="center">{row.index}</TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h6" align="center">
            No leaderboard data available.
          </Typography>
        )}
      </Box>
    </motion.div>
  );
};

export default MiniLeaderBoard;