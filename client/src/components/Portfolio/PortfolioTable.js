import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';


const columns = [
  { field: 'portfolioId', headerName: 'Portfolio ID', flex: 1, minWidth: 110 },
  { field: 'stockName', headerName: 'Stock Name', flex: 1.5, minWidth: 170 },
  { field: 'noofshares', headerName: 'Quantity', flex: 1, minWidth: 75 },
  { field: 'avgpurchaseprice', headerName: 'Avg Purchase Price', flex: 1, minWidth: 120 },
  { field: 'currentstockprice', headerName: 'Current Stock Price', flex: 1, minWidth: 130 },
  { field: 'percentage', headerName: 'Gain/Loss Percentage', flex: 1, minWidth: 170 },
  { field: 'totalportfoliovalue', headerName: 'Total Portfolio Value', flex: 1, minWidth: 140 },
];

const rows = [
  {
    id: 1,
    transactionId: 'TXN001',
    stockName: 'Apple Inc.',
    transactionType: 'Buy',
    quantity: 10,
    pricePerShare: 145.00,
    totalValue: 1450.00,
    dateTime: '2024-10-10 14:30',
  },
  {
    id: 2,
    transactionId: 'TXN002',
    stockName: 'Tesla Inc.',
    transactionType: 'Sell',
    quantity: 5,
    pricePerShare: 800.00,
    totalValue: 4000.00,
    dateTime: '2024-10-10 15:00',
  },
  {
    id: 3,
    transactionId: 'TXN003',
    stockName: 'Amazon.com Inc.',
    transactionType: 'Buy',
    quantity: 3,
    pricePerShare: 3200.00,
    totalValue: 9600.00,
    dateTime: '2024-10-10 15:30',
  },
  {
    id: 4,
    transactionId: 'TXN004',
    stockName: 'Netflix Inc.',
    transactionType: 'Sell',
    quantity: 4,
    pricePerShare: 500.00,
    totalValue: 2000.00,
    dateTime: '2024-10-10 16:00',
  },
  {
    id: 5,
    transactionId: 'TXN005',
    stockName: 'Meta Platforms, Inc.',
    transactionType: 'Buy',
    quantity: 15,
    pricePerShare: 300.00,
    totalValue: 4500.00,
    dateTime: '2024-10-09 09:15',
  },
  {
    id: 6,
    transactionId: 'TXN006',
    stockName: 'Alphabet Inc.',
    transactionType: 'Sell',
    quantity: 8,
    pricePerShare: 2800.00,
    totalValue: 22400.00,
    dateTime: '2024-10-09 10:00',
  },
  {
    id: 7,
    transactionId: 'TXN007',
    stockName: 'Microsoft Corporation',
    transactionType: 'Buy',
    quantity: 20,
    pricePerShare: 290.00,
    totalValue: 5800.00,
    dateTime: '2024-10-09 11:30',
  },
  {
    id: 8,
    transactionId: 'TXN008',
    stockName: 'NVIDIA Corporation',
    transactionType: 'Sell',
    quantity: 2,
    pricePerShare: 800.00,
    totalValue: 1600.00,
    dateTime: '2024-10-09 12:15',
  },
  {
    id: 9,
    transactionId: 'TXN009',
    stockName: 'Berkshire Hathaway Inc.',
    transactionType: 'Buy',
    quantity: 1,
    pricePerShare: 400000.00,
    totalValue: 400000.00,
    dateTime: '2024-10-08 08:45',
  },
  {
    id: 10,
    transactionId: 'TXN010',
    stockName: 'Johnson & Johnson',
    transactionType: 'Sell',
    quantity: 10,
    pricePerShare: 160.00,
    totalValue: 1600.00,
    dateTime: '2024-10-08 09:30',
  },
  {
    id: 11,
    transactionId: 'TXN011',
    stockName: 'Procter & Gamble Co.',
    transactionType: 'Buy',
    quantity: 7,
    pricePerShare: 145.00,
    totalValue: 1015.00,
    dateTime: '2024-10-07 14:00',
  },
  {
    id: 12,
    transactionId: 'TXN012',
    stockName: 'Coca-Cola Company',
    transactionType: 'Sell',
    quantity: 15,
    pricePerShare: 60.00,
    totalValue: 900.00,
    dateTime: '2024-10-07 15:45',
  },
  {
    id: 13,
    transactionId: 'TXN013',
    stockName: 'Walmart Inc.',
    transactionType: 'Buy',
    quantity: 20,
    pricePerShare: 140.00,
    totalValue: 2800.00,
    dateTime: '2024-10-06 10:30',
  },
  {
    id: 14,
    transactionId: 'TXN014',
    stockName: 'Visa Inc.',
    transactionType: 'Sell',
    quantity: 12,
    pricePerShare: 220.00,
    totalValue: 2640.00,
    dateTime: '2024-10-06 11:15',
  },
  {
    id: 15,
    transactionId: 'TXN015',
    stockName: 'The Home Depot, Inc.',
    transactionType: 'Buy',
    quantity: 5,
    pricePerShare: 350.00,
    totalValue: 1750.00,
    dateTime: '2024-10-06 12:00',
  },
];

export default function PortfolioTable() {
  return (
    <Box sx={{overflowX: 'auto', maxWidth: '100%' }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 2, textAlign: 'left' }} 
      >
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
          slotProps={{
            filterPanel: {
              filterFormProps: {
                logicOperatorInputProps: {
                  variant: 'outlined',
                  size: 'small',
                },
                columnInputProps: {
                  variant: 'outlined',
                  size: 'small',
                  sx: { mt: 'auto' },
                },
                operatorInputProps: {
                  variant: 'outlined',
                  size: 'small',
                  sx: { mt: 'auto' },
                },
                valueInputProps: {
                  InputComponentProps: {
                    variant: 'outlined',
                    size: 'small',
                  },
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}