import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

export default function StockPieChart() {
  const [data, setData] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [totalValue, setTotalValue] = useState("0");
  const colors = [
    'hsl(220, 20%, 65%)',
    'hsl(220, 20%, 42%)',
    'hsl(220, 20%, 35%)',
    'hsl(220, 20%, 25%)',
  ];

  useEffect(() => {
    // Replace 'your-api-url' with the actual API endpoint
    axios.get('api/portfolio')
      .then(response => {
        const stockData = response.data;
        let total = 0;

        const chartData = stockData.map((stock, index) => {
          total += stock.totalQuantity * stock.avgPurchasePrice;
          return {
            label: stock.stockName,
            value: stock.totalQuantity * stock.avgPurchasePrice,
          };
        });

        const stockDetails = stockData.map((stock, index) => ({
          name: stock.stockName, // use 'name' instead of 'stockName' here
          percentage: ((stock.totalQuantity * stock.avgPurchasePrice) / total) * 100,
          color: colors[index % colors.length],
        }));

        setData(chartData);
        setStocks(stockDetails);
        setTotalValue(total.toFixed(2));
      })
      .catch(error => {
        console.error("Error fetching stock data:", error);
      });
  }, []);

  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          User Stock Share
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <PieChart
            colors={colors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            series={[
              {
                data: data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: 'global', highlighted: 'item' },
              },
            ]}
            height={385}
            width={260}
          />
          {/* Overlay for total value */}
          <Typography
            component="div"
            variant="h6"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '24px',
              color: '#333',
            }}
          >
            ${totalValue}
          </Typography>
        </Box>
        {stocks.map((stock, index) => (
          <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {stock.stockName} {/* Use stock.name instead of stock.stockName */}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {stock.percentage.toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={stock.percentage}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: stock.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
