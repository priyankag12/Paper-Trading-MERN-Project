import React, { useEffect, useState } from "react";
import TickerSearch from "../../components/Trade/TickerSearch";
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import { closestStockValue } from "../../utils/closestStockValue";
import Modal from "../../components/Trade/Modal";
import { getStockDetails, getUserBalance } from "../../api/stockApi";
import CandleStickGraph from "../../components/Trade/CandleStickGraph";

const BuySellNew = () => {
    const theme = useTheme();
    const [selectedStock, setSelectedStock] = useState("");
    const [stockDetails, setStockDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    const [stockPrice, setStockPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [transactionType, setTransactionType] = useState("Buy");
    const [candleData, setCandleData] = useState("");

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
                stockData.message ? 0 : parseFloat(stockData.data["4. close"])
            );
            setCandleData(stockData.dataR);
            setLoading(false);
        } catch (error) {
            setErrorMessage("Error fetching stock price");
        }
    };

    useEffect(() => {
        if (selectedStock) {
            console.log("selected stock working");
            fetchStockDetails(selectedStock);
        }
    }, [selectedStock, isOpen]);

    useEffect(() => {
        fetchUserBalance();
    }, [isOpen]);

    useEffect(() => {
        if (selectedStock) {
            console.log("selected stock working");
            fetchStockValue(selectedStock);
        }
    }, [selectedStock]);

    return (
        <Stack
            spacing={selectedStock ? 1 : 2}
            sx={{ padding: selectedStock ? "5px" : "24px" }}
        >
            <TickerSearch onSelectStock={setSelectedStock} />
            {selectedStock && (
                <Stack
                    spacing={10}
                    sx={{ alignItems: "center", width: "100%" }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", lg: "row" },
                            gap: 5,
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Stack spacing={1} sx={{ alignItems: "center" }}>
                            <Typography
                                variant="h2"
                                sx={{ fontWeight: "bold" }}
                            >
                                Selected Stock
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: "1.2rem", fontWeight: "500" }}
                            >
                                {selectedStock.symbol} - {selectedStock.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: "1.2rem" }}
                            >
                                {loading ? (
                                    <CircularProgress />
                                ) : errorMessage ? (
                                    <Typography
                                        color="error"
                                        sx={{ fontSize: "1.2rem" }}
                                    >
                                        {errorMessage}
                                    </Typography>
                                ) : stockDetails ? (
                                    <Stack>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontSize: "1.2rem",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {stockDetails.totalQuantity > 0
                                                ? `Current Holdings: ${stockDetails.totalQuantity}`
                                                : "You do not own this stock."}
                                        </Typography>
                                        <Typography sx={{ fontSize: "1.2rem" }}>
                                            Stock Price: $
                                            {stockPrice.toFixed(2)}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            style={{ marginTop: "10px" }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => {
                                                    setTransactionType("Buy");
                                                    setIsOpen(true);
                                                }}
                                                disabled={loading}
                                                sx={{
                                                    fontSize: "1rem",
                                                    textTransform: "none",
                                                    padding: "8px 16px",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            theme.palette
                                                                .success.dark,
                                                    },
                                                }}
                                            >
                                                {loading ? (
                                                    <CircularProgress
                                                        size={24}
                                                    />
                                                ) : (
                                                    "Buy"
                                                )}
                                            </Button>

                                            {stockDetails.totalQuantity > 0 && (
                                                <Button
                                                    variant="contained"
                                                    color="info"
                                                    onClick={() => {
                                                        setTransactionType(
                                                            "Sell"
                                                        );
                                                        setIsOpen(true);
                                                    }}
                                                    disabled={loading}
                                                    sx={{
                                                        fontSize: "1rem",
                                                        textTransform: "none",
                                                        padding: "8px 16px",
                                                        "&:hover": {
                                                            backgroundColor:
                                                                theme.palette
                                                                    .info.dark,
                                                        },
                                                    }}
                                                >
                                                    {loading ? (
                                                        <CircularProgress
                                                            size={24}
                                                        />
                                                    ) : (
                                                        "Sell"
                                                    )}
                                                </Button>
                                            )}
                                        </Stack>
                                    </Stack>
                                ) : null}
                            </Typography>
                        </Stack>
                        <CandleStickGraph stockData={candleData} />
                    </Box>
                </Stack>
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
        </Stack>
    );
};

export default BuySellNew;
