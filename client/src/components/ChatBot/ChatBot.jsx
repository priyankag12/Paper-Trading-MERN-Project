import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import {
    Stack,
    TextField,
    Button,
    useTheme,
    Typography,
    Divider,
    CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatHistory from "./ChatHistory";
import apiClient from "../../services/apiClient";

const ChatBot = () => {
    const theme = useTheme();
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const sendMessage = async () => {
        if (!userInput.trim()) return;
        setIsLoading(true);

        setChatHistory((prev) => [
            ...prev,
            { type: "user", message: userInput },
        ]);
        setUserInput("");

        try {
            const response = await apiClient.post(
                "https://paperlingo-agent-production.up.railway.app/ask",
                { message: userInput }
            );

            console.log(response.data); // Debugging

            // Ensure correct data extraction
            const generatedContent = response.data.response; // Adjust based on backend response

            setChatHistory((prev) => [
                ...prev,
                { type: "bot", message: generatedContent },
            ]);
        } catch (error) {
            console.error("Error generating response:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatHistory]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "8px",
                border: `1px solid ${theme.palette.accent.main}`,
            }}
        >
            <Typography variant="h5" sx={{ margin: "16px" }}>
                ChatBot
            </Typography>
            <Divider />
            <Stack
                sx={{
                    flexGrow: 1,
                    padding: 2,
                    overflowY: "auto",
                }}
            >
                <ChatHistory chatHistory={chatHistory} />
                {isLoading && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: theme.palette.primary.light,
                            padding: 1.5,
                            borderRadius: "8px",
                            mb: 1,
                            width: "80%",
                            height: "50px",
                            color: theme.palette.text.primary,
                            alignSelf: "flex-start",
                        }}
                    >
                        <CircularProgress size={24} />
                    </Box>
                )}
                <div ref={chatEndRef} />
            </Stack>
            <Divider />
            <Stack direction="row" spacing={2} sx={{ padding: 2 }}>
                <TextField
                    fullWidth
                    value={userInput}
                    onChange={handleUserInput}
                    autoComplete="off"
                    variant="outlined"
                    placeholder="Type your message..."
                    size="small"
                    sx={{
                        color: theme.palette.text.primary,
                    }}
                />
                <Button
                    onClick={sendMessage}
                    disabled={isLoading}
                    sx={{
                        minWidth: "auto",
                        padding: 1.5,
                        borderRadius: "50%",
                        color: theme.palette.accent.main,
                    }}
                >
                    <SendIcon />
                </Button>
            </Stack>
        </Box>
    );
};

export default ChatBot;
