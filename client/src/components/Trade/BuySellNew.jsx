import React, { useEffect, useState } from "react";
import TickerSearch from "./TickerSearch";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { closestStockValue } from "../utils/closestStockValue";
import Modal from "./Modal";
import { getStockDetails, getUserBalance } from "../../api/stockApi";

const BuySellNew = () => {
    const [selectedStock, setSelectedStock] = useState("");
    const [stockDetails, setStockDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    const [stockPrice, setStockPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [transactionType, setTransactionType] = useState("Buy");

    const fetchStockDetails = async (selectedStock) => {
        if (!selectedStock) return;
        setLoading(true);
        try {
            const response = await getStockDetails(selectedStock.symbol);
            if (response) setStockDetails(response);
        } catch (error) {
            setErrorMessage(error.response?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const fetchUserBalance = async () => {
        try {
            const data = await getUserBalance();
            if (data) setBalance(data.balance);
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || "An error occurred"
            );
        }
    };

    const fetchStockValue = async (selectedStock) => {
        try {
            setLoading(true);
            const stockData = await closestStockValue(selectedStock.symbol);
            setStockPrice(
                stockData.message ? 0 : parseFloat(stockData["4. close"])
            );
            setLoading(false);
        } catch (error) {
            setErrorMessage("Error fetching stock price");
        }
    };

    useEffect(() => {
        if (selectedStock) {
            console.log("selected stock working");

            fetchStockDetails(selectedStock);
            fetchStockValue(selectedStock);
        }
    }, [selectedStock, isOpen]);

    useEffect(() => {
        fetchUserBalance();
    }, [isOpen]);

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
                                    Stock Price: ${stockPrice}
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
                                            setTransactionType("Buy");
                                            setIsOpen(true);
                                        }}
                                    >
                                        Buy
                                    </Button>

                                    {stockDetails.totalQuantity > 0 && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                setTransactionType("Sell");
                                                setIsOpen(true);
                                            }}
                                        >
                                            Sell
                                        </Button>
                                    )}
                                </Stack>
                            </div>
                        ) : null}
                    </Typography>
                </div>
            )}
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                balance={balance}
                stockPrice={stockPrice}
                selectedStock={selectedStock}
                transactionType={transactionType}
                availableQuantity={stockDetails.totalQuantity}
            />
        </div>
    );
};

export default BuySellNew;
