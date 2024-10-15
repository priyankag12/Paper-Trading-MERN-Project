import React, { useState } from "react";
import {
    Button,
    TextField,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Stack,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";

const TickerSearch = ({ onSelectStock }) => {
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const API_KEY = "";

    const fetchTickers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://www.alphavantage.co/query`,
                {
                    params: {
                        function: "SYMBOL_SEARCH",
                        keywords: inputValue,
                        apikey: API_KEY,
                    },
                }
            );
            const results = response.data.bestMatches || [];
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
        <div>
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid",
                    borderColor: "divider",
                    mt: "auto",
                    width: "100%",
                }}
            >
                <TextField
                    label="Enter Ticker Search Query"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchTickers}
                    disabled={loading || !inputValue}
                >
                    {loading ? (
                        <CircularProgress color="inherit" size={20} />
                    ) : (
                        "Search"
                    )}
                </Button>
            </Stack>

            {options.length > 0 && (
                <List>
                    {options.map((option, index) => (
                        <ListItem
                            button
                            key={index}
                            onClick={() => handleSelect(option)}
                        >
                            <Stack
                                direction="row"
                                sx={{
                                    p: 2,
                                    gap: 10,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderTop: "1px solid",
                                    borderColor: "divider",
                                    mt: "auto",
                                    width: "100%",
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="body1"
                                            style={{ fontWeight: "bold" }}
                                        >
                                            {`${option.symbol}`}
                                        </Typography>
                                    }
                                />
                                <ListItemText
                                    primary={`${option.name}`}
                                    sx={{
                                        width: "100%",
                                    }}
                                />
                            </Stack>
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default TickerSearch;
