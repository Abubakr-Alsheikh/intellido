import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Avatar,
  ListItem,
  Paper,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import TaskSuggestionBox from "./TaskSuggestionBox";
import logo from "../../images/logo.png";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

const ChatMessage = ({ message, isAiTyping, setIsAiTyping }) => {
  // Helper function to parse AI responses
  const splitResponse = (rawResponse) => {
    try {
      const match = rawResponse.match(/\[(.*?)\]/s);
      if (match) {
        const taskSuggestions = JSON.parse(match[0]);
        const conversationText = rawResponse
          .replace(`\`\`\`json\n${match[0]}\n\`\`\``, "")
          .trim();
        return { conversationText, taskSuggestions };
      } else {
        return { conversationText: rawResponse, taskSuggestions: [] };
      }
    } catch (error) {
      console.error("Error parsing task suggestions:", error);
      return { conversationText: rawResponse, taskSuggestions: [] };
    }
  };

  const [taskSuggestions, setTaskSuggestions] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isAiTyping) {
      let currentText = "";
      let index = 0;

      const splitResult = splitResponse(
        Array.isArray(message.parts) ? message.parts.join(" ") : message.parts
      );
      const textToType = splitResult.conversationText;

      setIsTyping(true); // Start the typing indicator

      const typingInterval = setInterval(() => {
        currentText += textToType[index];
        setDisplayedText(currentText);
        index++;

        if (index >= textToType.length) {
          clearInterval(typingInterval);
          setTaskSuggestions(splitResult.taskSuggestions);
          setShowSuggestions(true);
          setIsTyping(false);
        }
      }, 10);

      return () => clearInterval(typingInterval);
    } else if (message.role === "user") {
      setDisplayedText(
        Array.isArray(message.parts) ? message.parts.join(" ") : message.parts
      );
    } else {
      const splitResult = splitResponse(
        Array.isArray(message.parts) ? message.parts.join(" ") : message.parts
      );
      setDisplayedText(splitResult.conversationText);
      setTaskSuggestions(splitResult.taskSuggestions);
      setShowSuggestions(true);
    }
  }, [message, isAiTyping]);

  const isUser = message.role !== "model";
  const getFileTypeIcon = (fileType) => {
    if (fileType.startsWith("application/pdf")) {
      return <PictureAsPdfIcon sx={{ fontSize: 40, color: "grey.600" }} />;
    } else if (fileType.startsWith("audio/")) {
      return <MusicNoteIcon sx={{ fontSize: 40, color: "grey.600" }} />;
    } else if (fileType.startsWith("video/")) {
      return <VideoLibraryIcon sx={{ fontSize: 40, color: "grey.600" }} />;
    } else {
      return <InsertDriveFileIcon sx={{ fontSize: 40 }} />;
    }
  };
  return (
    <ListItem sx={{ padding: 1 }}>
      {" "}
      {/* Remove default ListItem padding */}
      <Grid container justifyContent={isUser ? "flex-end" : "flex-start"}>
        <Grid item xs={12} md={isUser ? 10 : 12}>
          {" "}
          {/* Adjust column sizes as needed */}
          <Paper
            variant="outlined"
            sx={{
              padding: 2,
              borderRadius: 2,
              backgroundColor: isUser ? "primary.main" : "action.hover",
              marginBottom: 1,
              marginLeft: isUser ? "auto" : 0,
              marginRight: !isUser ? "auto" : 0,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                src={!isUser ? logo : ""}
                sx={{
                  backgroundColor: isUser && "primary.light",
                  mr: 1,
                }}
              >
                {isUser ? "U" : "AI"}
              </Avatar>
              <Typography
                component={"span"}
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  color: isUser ? "white" : "text.primary",
                }}
              >
                {isUser ? "You" : "Intelli"}
              </Typography>
            </Box>

            {isTyping && ( // Display typing indicator
              <LinearProgress sx={{ mb: 1 }} />
            )}
            <Typography
              component={"span"}
              variant="body1"
              sx={{
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                color: isUser ? "white" : "text.primary",
              }}
            >
              {message.role === "model" ? (
                <ReactMarkdown>{displayedText}</ReactMarkdown>
              ) : (
                displayedText
              )}
            </Typography>

            {message.file && (
              <Box sx={{ mt: 1, position: "relative" }}>
                <Paper
                  elevation={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 2,
                    backgroundColor:
                      message.role === "user" ? "primary.light" : "#f5f5f5",
                  }}
                >
                  {message.file.type.startsWith("image/") ||
                  message.file.type.startsWith("audio/") ||
                  message.file.type.startsWith("video/") ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        overflow: "hidden",
                      }}
                    >
                      {message.file.type.startsWith("image/") && (
                        <img
                          src={message.fileURL}
                          alt={message.file.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            opacity:
                              message.uploadProgress > 0 &&
                              message.uploadProgress < 100
                                ? 0.5 // Apply opacity during upload
                                : 1,
                          }}
                        />
                      )}

                      {/* Audio Preview */}
                      {message.file.type.startsWith("audio/") && (
                        <audio
                          controls // Add controls for audio playback
                          style={{
                            width: "100%",
                            opacity:
                              message.uploadProgress > 0 &&
                              message.uploadProgress < 100
                                ? 0.5
                                : 1,
                          }}
                        >
                          <source src={message.fileURL} type={message.file.type} />
                          Your browser does not support the audio element.
                        </audio>
                      )}

                      {/* Video Preview */}
                      {message.file.type.startsWith("video/") && (
                        <video
                          controls // Add controls for video playback
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            opacity:
                              message.uploadProgress > 0 &&
                              message.uploadProgress < 100
                                ? 0.5
                                : 1,
                          }}
                        >
                          <source src={message.fileURL} type={message.file.type} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Box sx={{ mr: 2 }}>
                        {getFileTypeIcon(message.file.type)}
                      </Box>
                      <Typography variant="body2">
                        {message.file.name}
                      </Typography>
                    </Box>
                  )}

                  {message.uploadProgress > 0 &&
                    message.uploadProgress < 100 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <CircularProgress
                          variant="determinate"
                          value={message.uploadProgress}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "white",
                          }}
                        >
                          {message.uploadProgress}%
                        </Typography>
                      </Box>
                    )}
                </Paper>
              </Box>
            )}

            {showSuggestions && taskSuggestions.length > 0 && (
              <TaskSuggestionBox
                tasks={taskSuggestions}
                responseFromAI={isAiTyping}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ChatMessage;
