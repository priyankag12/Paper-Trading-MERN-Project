import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
    IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import apiClient from "../../services/apiClient";

export default function Modal({
    open,
    onClose,
    selectedStock,
    balance,
    stockPrice,
    transactionType,
    availableQuantity,
}) {
    const [quantity, setQuantity] = useState(1);
    const totalCost = quantity * stockPrice;

    useEffect(() => {
        setQuantity(1); // Reset quantity when modal is opened for a new transaction
    }, [open, transactionType]);

    const handleIncreaseQuantity = () => {
        const newQuantity = quantity + 1;
        if (transactionType === "Buy" && newQuantity * stockPrice <= balance) {
            setQuantity(newQuantity);
        } else if (
            transactionType === "Sell" &&
            newQuantity <= availableQuantity
        ) {
            setQuantity(newQuantity);
        }
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleQuantityChange = (e) => {
        const value = Math.max(1, Number(e.target.value));
        if (transactionType === "Buy" && value * stockPrice <= balance) {
            setQuantity(value);
        } else if (transactionType === "Sell" && value <= availableQuantity) {
            setQuantity(value);
        }
    };

    const handleTransaction = async () => {
        const transactionData = {
            stockName: selectedStock.symbol,
            transactionType: transactionType,
            quantity: quantity,
            pricePerShare: stockPrice,
        };

        try {
            const response = await apiClient.put(
                "/dashboard/add-transaction",
                transactionData
            );

            console.log(
                `${transactionType} transaction successful:`,
                response.data
            );
            onClose(); // Close the modal after the transaction
        } catch (error) {
            console.error(
                `Error adding ${transactionType} transaction:`,
                error
            );
        }
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {transactionType} {selectedStock?.symbol}
            </DialogTitle>
            <DialogContent>
                <Typography>
                    {transactionType === "Buy"
                        ? `Available Balance: $${balance}`
                        : `Available to Sell: ${availableQuantity} shares`}
                </Typography>
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
                            max:
                                transactionType === "Buy"
                                    ? Math.floor(balance / stockPrice)
                                    : availableQuantity,
                            type: "number",
                        }}
                    />
                    <IconButton onClick={handleIncreaseQuantity}>
                        <AddIcon />
                    </IconButton>
                </Stack>

                <Typography>
                    Total {transactionType === "Buy" ? "Cost" : "Proceeds"}: $
                    {totalCost}
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    style={{ marginTop: "20px" }}
                >
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={handleTransaction}
                        disabled={
                            transactionType === "Buy"
                                ? totalCost > balance
                                : quantity > availableQuantity
                        }
                    >
                        Confirm {transactionType}
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
