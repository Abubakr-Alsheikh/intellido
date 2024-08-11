import React, { useEffect, useRef } from "react";
import { List, Box, CircularProgress, Alert, Typography } from "@mui/material";
import ChatMessage from "./ChatMessage";
import { clearChatError } from "../../redux/slices/chatSlice";
import { useDispatch } from "react-redux";

const ChatHistory = ({ chatHistory, isLoading, error, isAiTyping }) => {
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <Box ref={chatContainerRef} sx={{ flexGrow: 1, overflowY: "auto" }}>
      <List>
        {chatHistory?.length > 0 && chatHistory ? (
          chatHistory
            .slice(1)
            .map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                isAiTyping={
                  isAiTyping &&
                  message.role === "model" &&
                  index === chatHistory.length - 2
                }
              />
            ))
        ) : (
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            No messages yet. Start a conversation!
          </Typography>
        )}
      </List>
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert
          severity="error"
          onClose={() => dispatch(clearChatError())}
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default ChatHistory;
