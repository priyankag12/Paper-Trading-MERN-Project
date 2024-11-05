import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import GainerLoserCard from "./GainerLoserCard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import BarChartIcon from "@mui/icons-material/BarChart";

const GainersLosersList = ({ data }) => {
  const [value, setValue] = useState("gainers");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="Gainers Losers Tabs"
      >
        <Tab
          icon={<TrendingUpIcon />}
          iconPosition="start"
          value="gainers"
          label="Top Gainers"
        />
        <Tab
          icon={<TrendingDownIcon />}
          iconPosition="start"
          value="losers"
          label="Top Losers"
        />
        <Tab
          icon={<BarChartIcon />}
          iconPosition="start"
          value="active"
          label="Most Active"
        />
      </Tabs>
      <Box sx={{ marginTop: 2, maxWidth: { md: "50%" } }}>
        {value === "gainers" && data?.top_gainers && (
          <>
            {data.top_gainers.map((stock, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <GainerLoserCard stock={stock} delay={index * 0.1} />
              </Box>
            ))}
          </>
        )}

        {value === "losers" && data?.top_losers && (
          <>
            {data.top_losers.map((stock, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <GainerLoserCard stock={stock} delay={index * 0.1} />
              </Box>
            ))}
          </>
        )}

        {value === "active" && data?.most_actively_traded && (
          <>
            {data.most_actively_traded.map((stock, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <GainerLoserCard stock={stock} delay={index * 0.1} />
              </Box>
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default GainersLosersList;
