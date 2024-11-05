import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Chip, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { getTransactions } from "../../api/transactionApi";

const columns = [
  {
    field: "transactionId",
    headerName: "Transaction ID",
    flex: 1,
    minWidth: 110,
  },
  { field: "stockName", headerName: "Stock Name", flex: 1, minWidth: 170 },
  {
    field: "transactionType",
    headerName: "Transaction Type",
    flex: 1,
    minWidth: 130,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === "Buy" ? "success" : "error"}
        sx={{
          p: 0.5,
          fontWeight: "bold",
          backgroundColor:
            params.value === "Buy" ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)",
          color: params.value === "Buy" ? "green" : "red",
        }}
        variant="filled"
      />
    ),
  },
  { field: "quantity", headerName: "Quantity", flex: 1, minWidth: 75 },
  {
    field: "pricePerShare",
    headerName: "Price per Share",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "totalTransactionValue",
    headerName: "Total Transaction Value",
    flex: 1,
    minWidth: 170,
  },
  { field: "dateTime", headerName: "Date and Time", flex: 1, minWidth: 140 },
];

export default function Transaction() {
  const theme = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const data = await getTransactions();
        if (data) {
          setTransactions(data.transactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <motion.div
      style={{ overflowX: "auto", maxWidth: "100%" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h3" gutterBottom sx={{ mb: 2, textAlign: "center" }}>
        Transaction History
      </Typography>
      <Box sx={{ width: "100%", minWidth: 600 }}>
        <DataGrid
          autoHeight
          loading={isLoading}
          rows={transactions}
          getRowId={(row) => row._id}
          columns={columns}
          disableSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[10, 20, 30]}
          disableColumnResize
          density="compact"
          sx={{
            border: 2,
            borderColor: theme.palette.accent.main,
            '& .MuiDataGrid-row:hover': {
              backgroundColor: theme.palette.neutral.light,
            },
          }}
        />
      </Box>
    </motion.div>
  );
}
