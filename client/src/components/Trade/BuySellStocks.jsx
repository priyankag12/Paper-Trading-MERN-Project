import React, { useEffect, useState } from "react";
import TickerSearch from "./TickerSearch";
import axios from "axios";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { getToken } from "../../auth";
import { closestStockValue } from "../utils/closestStockValue";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const BuySellStocks = () => {
    const [selectedStock, setSelectedStock] = useState(null);
    const [stockDetails, setStockDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    const [stockPrice, setStockPrice] = useState(0);
    const [openBuyModal, setOpenBuyModal] = useState(false);
    const [openSellModal, setOpenSellModal] = useState(false);
    const [quantitySell, setQuantitySell] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [totalCostSell, setTotalCostSell] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    async function fetchStockDetails(symbol) {
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
        } catch (error) {
            console.error("Error fetching stock details:", error);
            setErrorMessage(
                error.response?.data?.message || "An error occurred"
            );
        } finally {
            setLoading(false);
        }
    }

    async function fetchUserBalance() {
        try {
            const token = getToken();
            const response = await axios.get(
                "http://localhost:8000/api/auth/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setBalance(response.data.balance);
        } catch (error) {
            console.error("Error fetching user balance:", error);
            setErrorMessage(
                error.response?.data?.message || "An error occurred"
            );
        }
    }

    async function fetchStockPrice(symbol) {
        try {
            const stockData = await closestStockValue(symbol);

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
    }

    const handleBuy = async () => {
        const token = getToken();
        const transactionData = {
            stockName: selectedStock.symbol,
            transactionType: "Buy",
            quantity: quantity,
            pricePerShare: stockPrice,
        };

        try {
            const response = await axios.put(
                "http://localhost:8000/api/dashboard/add-transaction",
                transactionData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Transaction successful:", response.data);

            handleCloseBuyModal();
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };
    const handleSell = async () => {
        const token = getToken();
        const transactionData = {
            stockName: selectedStock.symbol,
            transactionType: "Sell",
            quantity: quantitySell,
            pricePerShare: stockPrice,
        };

        try {
            const response = await axios.put(
                "http://localhost:8000/api/dashboard/add-transaction",
                transactionData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Sell transaction successful:", response.data);

            handleCloseSellModal();
        } catch (error) {
            console.error("Error adding sell transaction:", error);
        }
    };

    const handleOpenBuyModal = async () => {
        await fetchUserBalance();
        await fetchStockPrice(selectedStock.symbol);
        setOpenBuyModal(true);
        setQuantity(1);
    };

    const handleOpenSellModal = async () => {
        await fetchStockPrice(selectedStock.symbol);
        setOpenSellModal(true);
        setQuantitySell(1);
    };

    const handleCloseBuyModal = () => {
        fetchStockDetails(selectedStock.symbol);
        fetchUserBalance();
        setOpenBuyModal(false);
    };

    const handleCloseSellModal = () => {
        fetchStockDetails(selectedStock.symbol);
        fetchUserBalance();
        setOpenSellModal(false);
    };

    const handleIncreaseQuantity = () => {
        const newQuantity = quantity + 1;
        const newTotalCost = newQuantity * stockPrice;
        if (newTotalCost <= balance) {
            setQuantity(newQuantity);
            setTotalCost(newTotalCost);
        }
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            setTotalCost(newQuantity * stockPrice);
        }
    };

    const handleIncreaseQuantitySell = () => {
        const newQuantity = quantitySell + 1;
        const newTotalCost = newQuantity * stockPrice;
        if (newQuantity <= stockDetails.totalQuantity) {
            setQuantitySell(newQuantity);
            setTotalCostSell(newTotalCost);
        }
    };

    const handleDecreaseQuantitySell = () => {
        if (quantitySell > 1) {
            const newQuantity = quantitySell - 1;
            setQuantitySell(newQuantity);
            setTotalCostSell(newQuantity * stockPrice);
        }
    };

    const handleQuantityChange = (e) => {
        const value = Math.max(1, Number(e.target.value));
        if (value * stockPrice <= balance) {
            setQuantity(value);
            setTotalCost(value * stockPrice);
        }
    };

    const handleQuantityChangeSell = (e) => {
        const value = Math.max(1, Number(e.target.value));
        setQuantitySell(value);
        setTotalCostSell(value * stockPrice);
    };

    useEffect(() => {
        setTotalCost(quantity * stockPrice);
    }, [quantity, stockPrice]);

    useEffect(() => {
        setTotalCostSell(quantitySell * stockPrice);
    }, [quantitySell, stockPrice]);

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
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    style={{ marginTop: "10px" }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleOpenBuyModal}
                                    >
                                        Buy
                                    </Button>

                                    {stockDetails.totalQuantity > 0 && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleOpenSellModal}
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
            <Dialog open={openBuyModal} onClose={handleCloseBuyModal}>
                <DialogTitle>Buy {selectedStock?.symbol}</DialogTitle>
                <DialogContent>
                    <Typography>Current Balance: ${balance}</Typography>
                    <Typography>Stock Price: ${stockPrice}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton onClick={handleDecreaseQuantity}>
                            <RemoveIcon />
                        </IconButton>
                        <TextField
                            value={quantity}
                            onChange={handleQuantityChange}
                            inputProps={{
                                min: 1,
                                max: Math.floor(balance / stockPrice),
                                type: "number",
                            }}
                        />
                        <IconButton onClick={handleIncreaseQuantity}>
                            <AddIcon />
                        </IconButton>
                    </Stack>
                    <Typography>Total Cost: ${totalCost.toFixed(2)}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseBuyModal} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleBuy}
                        color="primary"
                        disabled={totalCost > balance}
                    >
                        Buy
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openSellModal} onClose={handleCloseSellModal}>
                <DialogTitle>Sell {selectedStock?.symbol}</DialogTitle>
                <DialogContent>
                    <Typography>
                        Current Holdings: {stockDetails?.totalQuantity}
                    </Typography>
                    <Typography>Stock Price: ${stockPrice}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton onClick={handleDecreaseQuantitySell}>
                            <RemoveIcon />
                        </IconButton>
                        <TextField
                            value={quantitySell}
                            onChange={handleQuantityChangeSell}
                            inputProps={{
                                min: 1,
                                max: stockDetails?.totalQuantity,
                                type: "number",
                            }}
                        />
                        <IconButton onClick={handleIncreaseQuantitySell}>
                            <AddIcon />
                        </IconButton>
                    </Stack>
                    <Typography>
                        Total Value: ${(quantitySell * stockPrice).toFixed(2)}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSellModal} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSell}
                        color="primary"
                        disabled={quantity > stockDetails?.totalQuantity}
                    >
                        Sell
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BuySellStocks;
