import React, { useMemo } from "react";
import { formatStockData } from "../../utils/formatStockData";
import ReactApexCharts from "react-apexcharts";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CandleStickGraph = ({ stockData }) => {
    console.log(stockData);
    const theme = useTheme();

    const seriesData = useMemo(() => formatStockData(stockData), [stockData]);
    console.log(seriesData);

    return (
        <Box
            sx={{
                width: "60vw",
                maxWidth: "100vw",
                overflowX: "hidden",
                height: "40vh",
                border: `2px solid ${theme.palette.accent.main}`,
                borderRadius: "8px",
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: theme.palette.neutral.main,
                    borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: theme.palette.neutral.light,
                },
            }}
        >
            <ReactApexCharts
                series={[{ data: seriesData }]}
                options={{
                    chart: {
                        type: "candlestick",
                        height: "100%",
                        width: "100%",
                        toolbar: {
                            show: true,
                        },
                    },
                    title: {
                        text: "CandleStick Chart",
                        align: "left",
                        style: {
                            color: theme.palette.text.primary, // Set title color to primary
                        },
                    },
                    xaxis: {
                        type: "datetime",
                        labels: {
                            style: {
                                colors: theme.palette.text.primary, // Set x-axis label color
                            },
                        },
                    },
                    yaxis: {
                        tooltip: {
                            enabled: true,
                        },
                        labels: {
                            style: {
                                colors: theme.palette.text.primary, // Set y-axis label color
                            },
                        },
                    },
                    responsive: [
                        {
                            breakpoint: 768, // Mobile screens
                            options: {
                                chart: {
                                    height: 300,
                                },
                            },
                        },
                        {
                            breakpoint: 1200, // Tablets and below
                            options: {
                                chart: {
                                    height: 500,
                                },
                            },
                        },
                    ],
                }}
                type="candlestick"
                height="100%"
                width="100%"
            />
        </Box>
    );
};

export default CandleStickGraph;
