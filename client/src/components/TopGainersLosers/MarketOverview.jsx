import React, { useEffect, useState } from "react";
import GainersLosersList from "./GainersLosersList";
import { Box, CircularProgress, Typography } from "@mui/material";
import { fetchGainersAndLosers } from "../../api/homeApi";

const MarketOverview = () => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true); 
      try {
        const data = await fetchGainersAndLosers();
        if (!data || Object.keys(data).length === 0) {
          throw new Error("No data available");
        }
        setStockData(data);
      } catch (error) {
        console.error("Error in fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <Box sx={{ margin: 2, mb: 4 }}>
      <Typography variant="h3">
        Market Overview
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <GainersLosersList data={stockData} />
      )}
    </Box>
  );
};

export default MarketOverview;