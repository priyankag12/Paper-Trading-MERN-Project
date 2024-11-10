import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    CircularProgress,
    Container,
    Avatar,
    Badge,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { fetchLeaderBoard } from "../../api/quizApi";

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 600,
    margin: "auto",
    borderRadius: 16,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(2),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(1.5),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const Leaderboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const getLeaderBoard = async () => {
            try {
                setIsLoading(true);
                const response = await fetchLeaderBoard();
                const rankedData = (response?.data?.ranking || []).map(
                    (item, index) => ({
                        ...item,
                        index: index + 1,
                    })
                );

                setLeaderboard(rankedData || []);
                console.log(leaderboard);
            } catch (error) {
                console.error(
                    "Error fetching leaderboard: ",
                    error.response?.data?.message || error.message
                );
            } finally {
                setIsLoading(false);
            }
        };

        getLeaderBoard();
    }, []);

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <StyledCard>
                    <CardContent>
                        <Typography
                            variant="h4"
                            align="center"
                            fontWeight="bold"
                            gutterBottom
                        >
                            Leaderboard
                        </Typography>
                        {isLoading ? (
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                p={3}
                            >
                                <CircularProgress />
                            </Box>
                        ) : leaderboard.length > 0 ? (
                            <List>
                                {leaderboard.map((row) => (
                                    <Box key={row._id}>
                                        <StyledListItem>
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <Badge
                                                    badgeContent={row.index}
                                                    color={
                                                        row.index === 1
                                                            ? "warning"
                                                            : row.index === 2
                                                            ? "info"
                                                            : row.index === 3
                                                            ? "secondary"
                                                            : "default"
                                                    }
                                                    overlap="circular"
                                                    sx={{ marginRight: 2 }}
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            src={row.avatar}
                                                            alt={row.username}
                                                            sx={{
                                                                width: 56,
                                                                height: 56,
                                                            }}
                                                        />
                                                    </ListItemAvatar>
                                                </Badge>
                                                <ListItemText
                                                    primary={
                                                        <Typography
                                                            variant="h6"
                                                            fontWeight="500"
                                                        >
                                                            {row.username}
                                                        </Typography>
                                                    }
                                                />
                                            </Box>
                                            <Typography
                                                variant="body1"
                                                fontWeight="500"
                                                color="textSecondary"
                                                sx={{
                                                    textAlign: "right",
                                                    flexGrow: 1,
                                                }}
                                            >
                                                Score: {row.points}
                                            </Typography>
                                        </StyledListItem>
                                        <Divider
                                            variant="inset"
                                            component="li"
                                        />
                                    </Box>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="h6" align="center">
                                No leaderboard data available.
                            </Typography>
                        )}
                    </CardContent>
                </StyledCard>
            </motion.div>
        </Container>
    );
};

export default Leaderboard;
