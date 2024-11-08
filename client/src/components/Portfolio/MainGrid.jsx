import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import UserStockshare from "./UserStockshare";
import PageViewsBarChart from "./PageViewsBarChart";
import StatCard from "./StatCard";
import PortfolioTable from "./PortfolioTable";
import apiClient from "../../services/apiClient";
import { getUserDetails } from "../../api/quizApi";

export default function MainGrid() {
    const [points, setPoints] = useState(0); 
    const [balance, setBalance] = useState(0);
    const [rank, setRank] = useState(0);
    const [portfolioData, setPortfolioData] = useState([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await getUserDetails();
                console.log("User Data:", response);
                setPoints(response.data.points || 10000); // Set fetched points or default to 10,000
                setBalance(Number(response.data.balance).toFixed(2));
                setRank(response.data.userRank);
            } catch (error) {
                console.error("Error fetching user stats:", error);
            }
        }

        async function fetchPortfolioData() {
            try {
                const response = await apiClient.get("/portfolio/portfolio");
                console.log("Portfolio Data:", response.data);
                const portfolioData = response.data.map((item, index) => ({
                    id: index + 1,
                    stockName: item.stockName,
                    totalQuantity: item.totalQuantity,
                    avgPurchasePrice: item.avgPurchasePrice,
                    currentStockPrice: item.currentStockPrice,
                    gainLossPercentage: item.gainLossPercentage,
                    totalPortfolioValue: item.totalPortfolioValue,
                }));
                setPortfolioData(portfolioData);
            } catch (error) {
                console.error("Error fetching portfolio data:", error);
            }
        }

        fetchUserData();
        fetchPortfolioData();
    }, []);

    // Calculate profit/loss
    const initialPoints = 10000;
    const profitLoss = balance - initialPoints;
    const profitTrend = profitLoss > 0 ? 'up' : profitLoss < 0 ? 'down' : 'neutral';

    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
                Overview
            </Typography>
            <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard 
                        title={<Typography variant="subtitle1" fontWeight="bold">Overall Portfolio Value</Typography>} 
                        value={`$${balance}`} 
                        trend="neutral" 
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard 
                        title={<Typography variant="subtitle1" fontWeight="bold">User Profit/Loss</Typography>} 
                        value={`$${profitLoss.toFixed(2)}`} 
                        trend={profitTrend} 
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard 
                        title={<Typography variant="subtitle1" fontWeight="bold">User Rank</Typography>} 
                        value={rank} 
                        trend="neutral" 
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatCard 
                        title={<Typography variant="subtitle1" fontWeight="bold">User Points</Typography>} 
                        value={points.toString()} 
                        trend="neutral" 
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} columns={12}>
                <Grid item sm={12} md={6}>
                    {portfolioData.length > 0 && (
                        <PageViewsBarChart rows={portfolioData} />
                    )}
                </Grid>
            </Grid>

            <Grid container spacing={2} columns={12}>
                <Grid item md={12} lg={9}>
                    {portfolioData.length > 0 && (
                        <PortfolioTable rows={portfolioData} />
                    )}
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Stack
                        gap={2}
                        direction={{ xs: "column", sm: "row", lg: "column" }}
                    >
                        <UserStockshare portfolioData={portfolioData} />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
