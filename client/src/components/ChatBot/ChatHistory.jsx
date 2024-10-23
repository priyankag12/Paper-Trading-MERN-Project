import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import ReactMarkdown from "react-markdown"; 

const ChatHistory = ({ chatHistory }) => {
  const theme = useTheme();

  return (
    <>
      {chatHistory.map((message, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: theme.palette.primary.light,
            paddingX: 1,
            borderRadius: "8px",
            mb: 1,
            width: "80%",
            alignSelf: message.type === "user" ? "flex-end" : "flex-start",
            color: theme.palette.text.primary,
          }}
        >
          <ReactMarkdown>{message.message}</ReactMarkdown>
        </Box>
      ))}
    </>
  );
};

export default ChatHistory;