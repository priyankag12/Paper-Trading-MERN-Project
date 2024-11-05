import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import UserStockshare from "./UserStockshare";
import PageViewsBarChart from "./PageViewsBarChart";
import StatCard from "./StatCard";
import PortfolioTable from "./PortfolioTable";
import apiClient from "../../services/apiClient";

const data = [
    {
        title: "Overall Portfolio Value",
        value: "14k",
        interval: "Last 30 days",
        trend: "up",
        data: [
            200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360,
            340, 380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460,
            600, 880, 920,
        ],
    },
    {
        title: "Conversions",
        value: "325",
        interval: "Last 30 days",
        trend: "down",
        data: [
            1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820,
            840, 600, 820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520,
            480, 400, 360, 300, 220,
        ],
    },
    {
        title: "User Balance",
        value: "200k",
        interval: "Last 30 days",
        trend: "neutral",
        data: [
            500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530,
            620, 510, 530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420,
            510, 430, 520, 510,
        ],
    },
];

export default function MainGrid() {
    const [portfolioData, setPortfolioData] = useState([]);

    useEffect(() => {
        async function fetchPortfolioData() {
            try {
                const response = await apiClient.get("/portfolio/portfolio");
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

        fetchPortfolioData();
    }, []);

    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Overview
            </Typography>
            <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
                {data.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
                        <StatCard {...card} />
                    </Grid>
                ))}
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}></Grid>
                <Grid size={{ sm: 12, md: 6 }}>
                    <PageViewsBarChart rows={portfolioData} />
                </Grid>
            </Grid>

            <Grid container spacing={2} columns={12}>
                <Grid size={{ md: 12, lg: 9 }}>
                    <PortfolioTable rows={portfolioData} />
                </Grid>
                <Grid size={{ xs: 12, lg: 3 }}>
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
