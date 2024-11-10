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
    useTheme,
    Snackbar,
    Alert
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
    const theme = useTheme();
    const [quantity, setQuantity] = useState(1);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const totalCost = quantity * stockPrice;

    useEffect(() => {
        setQuantity(1);
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
                "/transaction/add-transaction",
                transactionData
            );

            console.log(
                `${transactionType} transaction successful:`,
                response.data
            );
            setSnackbarOpen(true);
            onClose();
        } catch (error) {
            console.error(
                `Error adding ${transactionType} transaction:`,
                error
            );
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="xs"
                PaperProps={{ sx: { borderRadius: 5 } }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                    }}
                >
                    {transactionType} {selectedStock?.symbol}
                </DialogTitle>
                <DialogContent
                    sx={{
                        backgroundColor: theme.palette.background.default,
                        padding: "24px",
                        width: "400px",
                        height: "350px",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            marginBottom: "12px",
                        }}
                    >
                        {transactionType === "Buy"
                            ? `Available Balance: $${balance.toFixed(2)}`
                            : `Available to Sell: ${availableQuantity} shares`}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            marginBottom: "24px",
                        }}
                    >
                        Stock Price: ${stockPrice.toFixed(2)}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton onClick={handleDecreaseQuantity}>
                            <RemoveIcon color="primary" />
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
                            sx={{
                                "& .MuiInputBase-root": {
                                    backgroundColor:
                                        theme.palette.background.paper,
                                    borderRadius: "8px",
                                    fontSize: "1.2rem",
                                },
                                width: "80px",
                            }}
                        />
                        <IconButton onClick={handleIncreaseQuantity}>
                            <AddIcon color="primary" />
                        </IconButton>
                    </Stack>

                    <Typography
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            marginTop: "16px",
                        }}
                    >
                        Total {transactionType === "Buy" ? "Cost" : "Proceeds"}:
                        ${totalCost.toFixed(2)}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ marginTop: "20px", justifyContent: "center" }}
                    >
                        <Button
                            onClick={onClose}
                            color="secondary"
                            sx={{
                                backgroundColor: theme.palette.error.main,
                                color: "#fff",
                                textTransform: "none",
                                fontSize: "1rem",
                                "&:hover": {
                                    backgroundColor: theme.palette.error.dark,
                                },
                            }}
                        >
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
                            sx={{
                                backgroundColor: theme.palette.success.main,
                                color: "#fff",
                                textTransform: "none",
                                fontSize: "1rem",
                                "&:hover": {
                                    backgroundColor: theme.palette.success.dark,
                                },
                            }}
                        >
                            Confirm {transactionType}
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Transaction Completed successfully!
                </Alert>
            </Snackbar>
        </>
    );
}
