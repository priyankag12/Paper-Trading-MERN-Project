import React, { useState } from "react";
import {
    Button,
    TextField,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Stack,
    Box,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

const TickerSearch = ({ onSelectStock }) => {
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const apiKey = process.env.REACT_APP_API_KEY;

    const fetchTickers = async () => {
        setLoading(true);
        console.log(apiKey);
        try {
            const response = await axios.get(
                `https://www.alphavantage.co/query`,
                {
                    params: {
                        function: "SYMBOL_SEARCH",
                        keywords: inputValue,
                        apikey: apiKey,
                    },
                }
            );
            const results = response.data.bestMatches || [];
            console.log(response.data);

            const tickers = results.map((item) => ({
                symbol: item["1. symbol"],
                name: item["2. name"],
            }));
            setOptions(tickers);
        } catch (error) {
            console.error("Error fetching ticker data:", error);
        }
        setLoading(false);
    };

    const handleSelect = (option) => {
        onSelectStock(option);
        setOptions([]);
        setInputValue("");
    };

    return (
        <div
            style={{
                backgroundColor: "#F9F7F7",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    padding: "40px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    maxWidth: "600px",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: "#112D4E", fontWeight: "bold" }}
                >
                    Stock Ticker Search
                </Typography>
                <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                        color: "#112D4E",
                        opacity: 0.7,
                        marginBottom: "20px",
                    }}
                >
                    Search for stock symbols and get real-time market data.
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        mb: 3,
                        alignItems: "center",
                        backgroundColor: "#DBE2EF",
                        borderRadius: "8px",
                        padding: "10px 15px",
                    }}
                >
                    <TextField
                        label="Enter Stock Symbol or Name"
                        placeholder="e.g. AAPL, Tesla"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        fullWidth
                        sx={{
                            backgroundColor: "#F9F7F7",
                            borderRadius: "8px",
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={fetchTickers}
                        disabled={loading || !inputValue}
                        sx={{
                            backgroundColor: "#3F72AF",
                            color: "#fff",
                            textTransform: "none",
                            padding: "10px 20px",
                            "&:hover": {
                                backgroundColor: "#2C598E",
                            },
                        }}
                        startIcon={<SearchIcon />}
                    >
                        {loading ? (
                            <CircularProgress color="inherit" size={24} />
                        ) : (
                            "Search"
                        )}
                    </Button>
                </Stack>

                {options.length > 0 && (
                    <>
                        <List>
                            {options.map((option, index) => (
                                <ListItem
                                    button
                                    key={index}
                                    onClick={(event) => handleSelect(option)}
                                    sx={{
                                        backgroundColor: "#F9F7F7",
                                        borderRadius: "8px",
                                        mb: 2,
                                        padding: "10px 20px",
                                        transition:
                                            "background-color 0.3s ease",
                                        "&:hover": {
                                            backgroundColor: "#DBE2EF",
                                        },
                                        boxShadow:
                                            "0px 2px 8px rgba(0, 0, 0, 0.05)",
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography
                                                variant="h6"
                                                style={{
                                                    fontWeight: "600",
                                                    color: "#112D4E",
                                                }}
                                            >
                                                {`${option.symbol}`}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography
                                                variant="body2"
                                                style={{
                                                    color: "#112D4E",
                                                    opacity: 0.7,
                                                }}
                                            >
                                                {`${option.name}`}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </Box>
        </div>
    );
};

export default TickerSearch;
