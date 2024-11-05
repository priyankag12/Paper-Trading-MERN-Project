import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RemoveIcon from '@mui/icons-material/Remove'; 
import { motion } from "framer-motion";
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  borderColor: theme.palette.accent.main, 
  backgroundColor: theme.palette.accent.main,
}));

const GainerLoserCard = ({ stock, delay }) => { 
  const change_amount = parseFloat(stock.change_amount).toFixed(2);
  const price = parseFloat(stock.price).toFixed(2);

  const getChipColor = () => {
    if (change_amount > 0) return "success";
    if (change_amount < 0) return "error";
    return "default";
  };

  const getChipIcon = () => {
    if (change_amount > 0) {
      return <ArrowUpwardIcon fontSize="small" />;
    } else if (change_amount < 0) {
      return <ArrowDownwardIcon fontSize="small" />;
    } else {
      return <RemoveIcon fontSize="small" />; 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, delay }} 
    >
      <StyledCard variant="outlined">
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Box>
            <Typography variant="h6" color="text.primary">{stock.ticker}</Typography>
            <Typography variant="body2" color="text.secondary">${price}</Typography>
          </Box>

          <Chip
            label={`${change_amount}%`}
            color={getChipColor()}
            icon={getChipIcon()} 
            sx={{ fontWeight: "bold", width: "fit-content", minWidth: '2rem' }}
          />
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default GainerLoserCard;