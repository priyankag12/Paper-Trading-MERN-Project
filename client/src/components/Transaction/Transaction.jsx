import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import apiClient from "../../services/apiClient"; 
import { getToken } from "../../auth";
const columns = [
    { field: "transactionId", headerName: "Transaction ID", flex: 1, minWidth: 110 },
    { field: "stockName", headerName: "Stock Name", flex: 1, minWidth: 170 },
    { field: "transactionType", headerName: "Transaction Type", flex: 1, minWidth: 130 },
    { field: "quantity", headerName: "Quantity", flex: 1, minWidth: 75 },
    { field: "pricePerShare", headerName: "Price per Share", flex: 1, minWidth: 120 },
    { field: "totalValue", headerName: "Total Transaction Value", flex: 1, minWidth: 170 },
    { field: "dateTime", headerName: "Date and Time", flex: 1, minWidth: 140 },
];

export default function Transaction() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchTransactions = async () => {
          try {
              const token = getToken(); // Check if the token exists
              console.log("Token being sent:", token); // Log the token
  
              setIsLoading(true);
              const response = await apiClient.get("/dashboard/transaction-history");
              setTransactions(response.data.transactions); // Set fetched transactions
          } catch (error) {
              console.error(
                  "Error fetching transactions:",
                  error.response?.data?.message || error.message
              );
          } finally {
              setIsLoading(false);
          }
      };
  
      fetchTransactions(); // Fetch transactions on component mount
  }, []);

    return (
        <Box sx={{ overflowX: 'auto', maxWidth: '100%' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 2, textAlign: 'center' }}>
                Transaction History
            </Typography>
            <Box sx={{ width: '100%', minWidth: 600 }}>
                <DataGrid
                    autoHeight
                    loading={isLoading}
                    rows={transactions} // Use the fetched transactions
                    getRowId={(row) => row._id}
                    columns={columns}
                    disableSelectionOnClick
                    initialState={{
                        pagination: { paginationModel: { pageSize: 20 } },
                    }}
                    pageSizeOptions={[10, 20, 30]}
                    disableColumnResize
                    density="compact"
                />
            </Box>
        </Box>
    );
}