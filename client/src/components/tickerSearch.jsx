import React, { useState } from "react";
import {
    Button,
    TextField,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import axios from "axios";

const TickerSearch = () => {
    const [inputValue, setInputValue] = useState(""); // Store user input
    const [loading, setLoading] = useState(false); // Loading state for API call
    const [options, setOptions] = useState([]); // Store fetched options
    const [selectedOption, setSelectedOption] = useState(null); // Store user selected option

    // Access API key from the .env file
    const API_KEY = "";

    // Fetch stock ticker data from Alpha Vantage
    const fetchTickers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://www.alphavantage.co/query`,
                {
                    params: {
                        function: "SYMBOL_SEARCH",
                        keywords: inputValue, // Use user input
                        apikey: API_KEY,
                    },
                }
            );
            const results = response.data.bestMatches || [];
            const tickers = results.map((item) => ({
                symbol: item["1. symbol"],
                name: item["2. name"],
            }));
            setOptions(tickers); // Store the fetched options
        } catch (error) {
            console.error("Error fetching ticker data:", error);
        }
        setLoading(false);
    };

    // Handle user selection of a ticker
    const handleSelect = (option) => {
        setSelectedOption(option);
        setOptions([]); // Clear options after selection
        setInputValue(""); // Optionally clear the input field
    };

    return (
        <div>
            {/* Input field for manual user entry */}
            <TextField
                label="Enter Ticker Search Query"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                fullWidth
            />

            {/* Search button */}
            <Button
                variant="contained"
                color="primary"
                onClick={fetchTickers}
                disabled={loading || !inputValue}
                style={{ marginTop: "20px" }}
            >
                {loading ? (
                    <CircularProgress color="inherit" size={20} />
                ) : (
                    "Search"
                )}
            </Button>

            {/* Display search results */}
            {options.length > 0 && (
                <List>
                    {options.map((option, index) => (
                        <ListItem
                            button
                            key={index}
                            onClick={() => handleSelect(option)}
                        >
                            <ListItemText
                                primary={`${option.symbol} - ${option.name}`}
                            />
                        </ListItem>
                    ))}
                </List>
            )}

            {/* Display the selected option */}
            {selectedOption && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Selected Ticker:</h3>
                    <p>
                        {selectedOption.symbol} - {selectedOption.name}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TickerSearch;
