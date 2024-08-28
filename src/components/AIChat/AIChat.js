import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sendChatMessage,
  getChatHistory,
  clearChatHistory,
} from "../../redux/slices/chatSlice";
import { Typography, Container, Paper } from "@mui/material";
import { useDropzone } from "react-dropzone";
import ChatHistory from "./ChatHistory";
import MessageInput from "./MessageInput";
import ClearChatButton from "./ClearChatButton";

const AIChat = () => {
  const dispatch = useDispatch();
  const currentChat = useSelector(
    (state) => state.chat.chatHistory[0]?.current_chat
  );
  const isLoading = useSelector((state) => state.chat.isLoading);
  const error = useSelector((state) => state.chat.error);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAiTyping, setIsAiTyping] = useState(false);

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

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (inputMessage.trim() !== "" || selectedFile) {
      const formData = new FormData();
      formData.append("content", inputMessage);

      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      setIsAiTyping(true);
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
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            position: "relative",
          }}
        >
          <ChatHistory
            chatHistory={currentChat}
            isLoading={isLoading}
            error={error}
            isAiTyping={isAiTyping}
          />

          <ClearChatButton onClearChat={handleClearChat} />

          <MessageInput
            selectedFile={selectedFile}
            inputMessage={inputMessage}
            onInputChange={handleInputChange}
            onFileChange={handleFileChange}
            onSendMessage={handleSendMessage}
            setSelectedFile={setSelectedFile}
          />
        </Paper>
      </Container>
    </div>
  );
};

export default AIChat;
