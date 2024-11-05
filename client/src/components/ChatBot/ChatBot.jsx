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
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from "./ChatHistory";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a chatbot for PaperLingo, a paper trading platform that allows users to practice trading stocks with virtual points instead of real money. Users can buy and sell stocks, track their performance, and earn additional points by completing quizzes when they run out of points. Your role is to assist users with their trading inquiries, provide information about how the platform works, and help them with stock-related questions. Additionally, guide users through the platform’s key features, including the Portfolio section where users can view and track their stock performance, the Transaction History section where they can review previous transactions, the Earn Points section where users can participate in quizzes to earn more points for trading, and the Leaderboard where users can see their rankings compared to others. In the Trading section, assist users with buying or selling stocks and provide any relevant trading tips. Be professional, informative, and user-friendly in your responses.When answering questions, aim to be clear, concise, and engaging. Encourage users to explore platform features (such as taking quizzes to earn points), and help them learn basic stock trading concepts (like how to read stock prices, place orders, and track performance). If you’re unsure about a user’s request, gracefully ask them to clarify or suggest other actions they can take on the platform.Stay on-topic and focus solely on answering the user’s query without providing unnecessary information. Always aim to guide users in a way that enhances their trading experience and encourages them to engage with the platform.",
});

const generationConfig = {
  temperature: 0,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

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

    setChatHistory((prev) => [...prev, { type: "user", message: userInput }]);
    setUserInput("");

    try {
      const chatSession = model.startChat({ generationConfig });
      const result = await chatSession.sendMessage(userInput);

      const generatedContent = result.response.text();

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
