import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import apiClient from '../../services/apiClient';



const columns = [
  { field: 'stockName', headerName: 'Stock Name', flex: 1.5, minWidth: 170 },
  { field: 'totalQuantity', headerName: 'Quantity', flex: 1, minWidth: 75 },
  { field: 'avgPurchasePrice', headerName: 'Avg Purchase Price', flex: 1, minWidth: 120 },
  { field: 'currentStockPrice', headerName: 'Current Stock Price', flex: 1, minWidth: 130 },
  { field: 'gainLossPercentage', headerName: 'Gain/Loss Percentage', flex: 1, minWidth: 170 },
  { field: 'totalPortfolioValue', headerName: 'Total Portfolio Value', flex: 1, minWidth: 140 },
];

export default function PortfolioTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from the backend and populate the table
    async function fetchPortfolioData() {
      try {
        const response = await apiClient.get('/portfolio/portfolio');
        const portfolioData = response.data.map((item, index) => ({
          id: index + 1,
          stockName: item.stockName,
          totalQuantity: item.totalQuantity,
          avgPurchasePrice: item.avgPurchasePrice,
          currentStockPrice: item.currentStockPrice,
          gainLossPercentage: item.gainLossPercentage,
          totalPortfolioValue: item.totalPortfolioValue,
        }));
        setRows(portfolioData);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    }

    fetchPortfolioData();
  }, []);

  return (
    <Box sx={{ overflowX: 'auto', maxWidth: '100%' }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 2, textAlign: 'left', color: '#333' }}
      >
        Portfolio Table
      </Typography>
      <Box sx={{ width: '100%', minWidth: 600 }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[10, 20, 30]}
          disableColumnResize
          density="compact"
          sx={{
            '& .MuiDataGrid-root': {
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#fafafa',
            },
            '& .MuiDataGrid-cell': {
              color: '#333',
              fontSize: '0.875rem',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f4f4f4',
              borderBottom: '1px solid #ddd',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f1f1f1',
              cursor: 'pointer',
            },
            '& .MuiDataGrid-row.even': {
              backgroundColor: '#f9f9f9',
            },
            '& .MuiDataGrid-row.odd': {
              backgroundColor: '#fff',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid #ddd',
            },
          }}
        />
      </Box>
    </Box>
  );
}