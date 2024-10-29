import {
    Button,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

export default function Modal({
    open,
    children,
    onClose,
    selectedStock,
    balance,
    stockPrice,
    quantity,
}) {
    if (!open) return null;
    const totalCost = quantity * stockPrice;
    if (children === "Buy") {
    }

    return (
        <>
            <DialogTitle>
                {children} {selectedStock?.symbol}
            </DialogTitle>
            <DialogContent>
                <Typography>Current Balance: ${balance}</Typography>
                <Typography>Stock Price: ${stockPrice}</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                        value={quantity}
                        inputProps={{
                            min: 1,
                            max: Math.floor(balance / stockPrice),
                            type: "number",
                        }}
                    />
                </Stack>
                <Typography>Total Cost: ${totalCost.toFixed(2)}</Typography>
            </DialogContent>
            <Button onClick={onClose} color="primary">
                Close
            </Button>
        </>
    );
}
