import React, { useEffect, useState } from "react";
import TickerSearch from "./tickerSearch";
import axios from "axios";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { getToken } from "../auth";

const BuySellStocks = () => {
    const [selectedStock, setSelectedStock] = useState(null);
    const [stockDetails, setStockDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchStockDetails(symbol) {
        console.log("frontend token: ");

        setLoading(true);
        try {
            const token = getToken();
            const response = await axios.get(
                `http://localhost:8000/api/dashboard/stock-balance?ticker=${symbol}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setStockDetails(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching stock details:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (selectedStock) {
            fetchStockDetails(selectedStock.symbol);
        }
    }, [selectedStock]);

    return (
        <div>
            <TickerSearch onSelectStock={setSelectedStock} />
            {selectedStock && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Selected Stock </h3>
                    <p>
                        {selectedStock.symbol} - {selectedStock.name}
                    </p>
                    <Typography variant="body1">
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            stockDetails && (
                                <div>
                                    <Typography variant="body1">
                                        {stockDetails.totalQuantity > 0
                                            ? `Current Holdings: ${stockDetails.totalQuantity}`
                                            : "You do not own this stock."}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        style={{ marginTop: "10px" }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >
                                            Buy
                                        </Button>

                                        {stockDetails.totalQuantity > 0 && (
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Sell
                                            </Button>
                                        )}
                                    </Stack>
                                </div>
                            )
                        )}
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default BuySellStocks;
