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
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import * as api from "../services/api"; // Import your API functions

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
    setSelectedFile(null);
  };
  // TaskSuggestionBox Component
  const TaskSuggestionBox = ({ tasks }) => {
    const dispatch = useDispatch();

    const handleAcceptTask = async (task) => {
      try {
        // Send a request to your backend to create the task
        await api.createTask(task);

        // You might want to update the UI or display a success message
        console.log("Task created successfully!");
      } catch (error) {
        console.error("Error creating task:", error);
      }
    };

    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Task Suggestions
          </Typography>
          {tasks.map((task, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography variant="subtitle1">{task.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleAcceptTask(task)}
                >
                  Accept
                </Button>
                <Button size="small" variant="outlined" color="secondary">
                  Cancel
                </Button>
              </CardActions>
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  };

  // Helper function to parse AI responses (Improved)
  const splitResponse = (rawResponse) => {
    try {
      const match = rawResponse.match(/\[(.*?)\]/s);
      if (match) {
        const taskSuggestions = JSON.parse(match[0]); 
        const conversationText = rawResponse.replace(`\`\`\`json\n${match[0]}\n\`\`\``, "").trim();
        return { conversationText, taskSuggestions };
      } else {
        // If no JSON is found, return the entire response as text
        return { conversationText: rawResponse, taskSuggestions: [] };
      }
    } catch (error) {
      console.error("Error parsing task suggestions:", error);
      return { conversationText: rawResponse, taskSuggestions: [] };
    }
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
        chatHistory[0].current_chat.map((message, index) => {
          // Conditionally apply splitResponse() 
          let conversationText = '', taskSuggestions = []; 
          if (message.role === 'model') { // Only for AI responses
            const splitResult = splitResponse(Array.isArray(message.parts) ? message.parts.join(" ") : message.parts);
            conversationText = splitResult.conversationText;
            taskSuggestions = splitResult.taskSuggestions; 
          } else {
            // For user messages, just display the content
            conversationText = Array.isArray(message.parts) ? message.parts.join(" ") : message.parts; 
          }

          return (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={
                    <Box> 
                      <Typography variant="body1">
                        <strong>{message.role}: </strong>
                      </Typography>
                      {/* Conversation Block */}
                      <Typography>{conversationText}</Typography>

                      {/* Task Block (Conditional Rendering) */}
                      {taskSuggestions.length > 0 && (
                        <TaskSuggestionBox tasks={taskSuggestions} />
                      )}
                    </Box>
                  }
                />
              </ListItem>
            </React.Fragment>
          );
        })}
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
