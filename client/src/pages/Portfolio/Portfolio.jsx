import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import UserStockshare from "../../components/Portfolio/UserStockshare";
import PageViewsBarChart from "../../components/Portfolio/PageViewsBarChart";
import StatCard from "../../components/Portfolio/StatCard";
import PortfolioTable from "../../components/Portfolio/PortfolioTable";
import apiClient from "../../services/apiClient";
import { getUserDetails } from "../../api/quizApi";

const Portfolio = () => {
  const [balance, setBalance] = useState(0);
  const [rank, setRank] = useState(0);
  const [portfolioData, setPortfolioData] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await getUserDetails();
        console.log(response);
        setBalance(Number(response.data.balance).toFixed(2));
        setRank(response.data.userRank);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    }

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

    fetchUserData();
    fetchPortfolioData();
  }, []);

  // Calculate User Gain/Loss based on initial 10000 points
  const gainLoss = (balance - 10000).toFixed(2);

    // Calculate Overall Portfolio Value
  const overallPortfolioValue = portfolioData.reduce((acc, item) => acc + item.totalPortfolioValue, 0).toFixed(2);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, padding: 2 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard title="Overall Portfolio Value" value={`$${overallPortfolioValue}`} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard title="User Gain/Loss" value={`$${gainLoss}`} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard title="User Balance" value={`$${balance}`} />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1, minWidth: "0" }}>
              <PageViewsBarChart rows={portfolioData} />
            </Box>
          </Box>
        </Box>

        <Box sx={{ maxWidth: { xs: "100%", lg: "400px" }}}>
          <Stack direction="column" spacing={2}>
            <UserStockshare portfolioData={portfolioData} />
          </Stack>
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <PortfolioTable rows={portfolioData} />
      </Box>
    </Box>
  );
};

export default Portfolio;