import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sendChatMessage,
  getChatHistory,
  clearChatHistory,
  clearChatError,
} from "../../redux/slices/chatSlice";
import {
  TextField,
  Typography,
  Box,
  List,
  CircularProgress,
  Alert,
  Container,
  Grid,
  Paper,
  Tooltip,
  IconButton,
  InputAdornment,
  Fab,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ChatMessage from "./ChatMessage";
import { useDropzone } from "react-dropzone";

const AIChat = () => {
  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.chat.chatHistory[0]?.current_chat);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const error = useSelector((state) => state.chat.error);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isAiTyping, setIsAiTyping] = useState(false);

  useEffect(() => {
    dispatch(getChatHistory());
  }, [dispatch]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [currentChat]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (inputMessage.trim() !== "" || selectedFile) {
      const formData = new FormData();
      formData.append("content", inputMessage);

      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      setIsAiTyping(true); // Start typing indicator when sending message
      dispatch(sendChatMessage(formData));
      setInputMessage("");
      setSelectedFile(null);
    }
  };

  const handleClearChat = () => {
    dispatch(clearChatHistory());
    setSelectedFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
    noClick: true,
    noKeyboard: true,
  });

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  console.log(currentChat);

  return (
    <div>
      <Container
        maxWidth="md"
        {...getRootProps()}
        sx={{
          marginTop: 4,
          marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          height: "80vh",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color="white">
              Drop file here
            </Typography>
          </div>
        )}
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            borderRadius: 8,
            flexGrow: 1, // Make the Paper component fill available space
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            position: "relative",
          }}
        >
          {/* Chat History (with overflow) */}
          <Box ref={chatContainerRef} sx={{ flexGrow: 1, overflowY: "auto" }}>
            <List>
            {currentChat?.length > 0 && currentChat ? (
                currentChat.slice(1).map((message, index) => ( 
                  // Render all messages in current_chat
                  <ChatMessage
                    key={index}
                    message={message}
                    isAiTyping={
                      isAiTyping &&
                      message.role === "model" &&
                      index === currentChat.length - 2 
                    }
                    setIsAiTyping={setIsAiTyping}
                  />
                ))
              ) : (
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  No messages yet. Start a conversation!
                </Typography>
              )}
            </List>
            {error && (
              <Alert
                severity="error"
                onClose={() => dispatch(clearChatError())}
                sx={{ mb: 2 }}
              >
                {error}
              </Alert>
            )}
            {isLoading && (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                <CircularProgress />
              </Box>
            )}
          </Box>

          <Fab
            color="error"
            aria-label="clear chat"
            onClick={handleClearChat}
            sx={{ position: "absolute", top: 32, left: 32 }}
          >
            <DeleteIcon />
          </Fab>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderTop: 1,
              borderColor: "divider",
              borderRadius: 8,
            }}
            component="form"
            onSubmit={handleSendMessage}
          >
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="space-around"
            >
              <Grid item xs={12}>
                <TextField
                  label="What do you want to do today..."
                  variant="outlined"
                  fullWidth
                  value={inputMessage}
                  onChange={handleInputChange}
                  required
                  multiline
                  minRows={2}
                  maxRows={3}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Tooltip title="Attach File">
                          <IconButton
                            color="primary"
                            onClick={() => fileInputRef.current.click()}
                          >
                            <AttachFileIcon />
                          </IconButton>
                        </Tooltip>
                        {/* Hidden input for file selection */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton
                      position="end"
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!inputMessage && !isAiTyping}
                      >
                        <SendIcon fontSize="inherit" />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {selectedFile && (
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <InsertDriveFileIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">{selectedFile.name}</Typography>
                </Box>
                <Tooltip title="Remove File">
                  <IconButton
                    onClick={() => setSelectedFile(null)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Paper>
        </Paper>
      </Container>
    </div>
  );
};

export default AIChat;
