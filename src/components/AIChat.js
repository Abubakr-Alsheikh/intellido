import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sendChatMessage,
  getChatHistory,
  clearChatHistory,
  clearChatError,
} from "../redux/slices/chatSlice";
import {
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress, // Add loading indicator
  Alert,
  IconButton,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const AIChat = () => {
  const dispatch = useDispatch();
  const chatHistory = useSelector((state) => state.chat.chatHistory);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const error = useSelector((state) => state.chat.error);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getChatHistory());
  }, [dispatch]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "" || selectedFile) {
      const formData = new FormData();
      formData.append("content", inputMessage);
      formData.append("role", "user");

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      dispatch(sendChatMessage(formData));
      setInputMessage("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleClearChat = () => {
    dispatch(clearChatHistory());
    // If you want to automatically allow sending a new message after clearing
    // setSelectedFile(null);
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        AI Chat
      </Typography>

      {/* Loading Indicator */}
      {isLoading && <CircularProgress />}

      {/* Error Message */}
      {error && (
        <Alert severity="error" onClose={() => dispatch(clearChatError())}>
          {/* Assuming you have a clearChatError action */}
          {error}
        </Alert>
      )}

      {/* Chat History */}
      <List>
        {chatHistory.length > 0 &&
          chatHistory[0].current_chat &&
          chatHistory[0].current_chat.map((message, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <strong>{message.role}: </strong>
                    {message.parts}
                  </Typography>
                }
              />
            </ListItem>
          ))}
      </List>

      {/* Input Area */}
      <TextField
        label="Type your message..."
        variant="outlined"
        fullWidth
        value={inputMessage}
        onChange={handleInputChange}
        margin="normal"
      />
      {/* File Input */}
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <IconButton
        color="primary"
        component="span"
        onClick={() => fileInputRef.current.click()}
      >
        <AttachFileIcon />
      </IconButton>
      {selectedFile && (
        <Typography variant="body2">{selectedFile.name}</Typography>
      )}

      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>

      {/* Clear Chat Button */}
      <Button variant="outlined" color="secondary" onClick={handleClearChat}>
        Clear Chat
      </Button>
    </Box>
  );
};

export default AIChat;
