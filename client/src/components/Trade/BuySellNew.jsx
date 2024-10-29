import React, { useEffect, useState } from "react";
import TickerSearch from "./TickerSearch";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { closestStockValue } from "../utils/closestStockValue";
import Modal from "./Modal";
import { getStockDetails } from "../../api/stockApi";
import { getUserBalance } from "../../api/stockApi";

const BuySellNew = () => {
    const [selectedStock, setSelectedStock] = useState(null);
    const [stockDetails, setStockDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    const [stockPrice, setStockPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchStockDetails = async () => {
            if (!selectedStock) return;
            try {
                setLoading(true);
                const response = await getStockDetails(selectedStock.symbol);
                console.log(response);

                if (response) {
                    setStockDetails(response);
                }
            } catch (error) {
                console.error("Error fetching stock details:", error);
                setErrorMessage(error.response?.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchStockDetails();
    }, [selectedStock, isOpen]);

    useEffect(() => {
        const fetchUserBalance = async () => {
            try {
                const data = await getUserBalance();

                if (data) {
                    setBalance(data);
                }
            } catch (error) {
                console.log("Error fetching stock details:", error);
                setErrorMessage(
                    error.response?.data?.message || "An error occurred"
                );
            }
        };

        fetchUserBalance();
    }, [isOpen]);

    useEffect(() => {
        const fetchStockValue = async () => {
            try {
                const stockData = await closestStockValue(selectedStock.symbol);

                if (stockData.message) {
                    setErrorMessage(stockData.message);
                    setStockPrice(0);
                } else {
                    setStockPrice(parseFloat(stockData["4. close"]));
                }
            } catch (error) {
                console.error("Error fetching stock price:", error);
                setErrorMessage("Error fetching stock price");
            }
        };

        fetchStockValue();
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
                    <p></p>
                    <Typography variant="body1">
                        {loading ? (
                            <CircularProgress />
                        ) : errorMessage ? (
                            <Typography color="error">
                                {errorMessage}
                            </Typography>
                        ) : stockDetails ? (
                            <div>
                                <Typography variant="body1">
                                    {stockDetails.totalQuantity > 0
                                        ? `Current Holdings: ${stockDetails.totalQuantity}`
                                        : "You do not own this stock."}
                                </Typography>
                                <Typography>
                                    Stock price :${stockPrice}
                                </Typography>

                                <Stack
                                    direction="row"
                                    spacing={2}
                                    style={{ marginTop: "10px" }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setIsOpen(true);
                                        }}
                                    >
                                        Buy
                                    </Button>

                                    {stockDetails.totalQuantity > 0 && (
                                        // <Button
                                        //     variant="contained"
                                        //     color="secondary"
                                        //     onClick={handleOpenSellModal}
                                        // >
                                        //     Sell
                                        // </Button>
                                        <h1>Sell</h1>
                                    )}
                                </Stack>
                            </div>
                        ) : null}
                    </Typography>
                </div>
            )}
            <Modal
                open={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                balance={balance}
                stockPrice={stockPrice}
                selectedStock={selectedStock}
            >
                Buy
            </Modal>
        </div>
    );
};

export default BuySellNew;
