import React from "react";
import {
  Card,
  CardContent,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";

const UserInfo = ({ points, balance, ranking, pointsLoading }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        textAlign: "center",
        borderRadius: 4,
        padding: 3,
        border: `1px solid ${theme.palette.accent.main}`,
      }}
    >
      <Typography variant="h4" sx={{ pt: 3 }}>
        Player Details
      </Typography>
      <CardContent>
        {pointsLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h5" sx={{ p: 1 }}>
              Your Points: {points !== null ? points : "Error fetching points"}
            </Typography>
            <Typography variant="h5" sx={{ p: 1 }}>
              Your Balance: $
              {balance !== null ? balance : "Error fetching balance"}
            </Typography>
            <Typography variant="h5" sx={{ p: 1 }}>
              Your Ranking:{" "}
              {ranking !== null ? ranking : "Error fetching ranking"}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserInfo;
