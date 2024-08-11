import React, { useRef, useState } from "react";
import {
  TextField,
  Grid,
  Paper,
  Tooltip,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const MessageInput = ({
  selectedFile,
  inputMessage,
  onInputChange,
  onFileChange,
  onSendMessage,
  setSelectedFile,
}) => {
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  const allowedImageTypes = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/heic",
    "image/heif",
  ];
  const allowedAudioTypes = [
    "audio/wav",
    "audio/mp3",
    "audio/mpeg",
    "audio/x-m4a",
    "audio/aiff",
    "audio/aac",
    "audio/ogg",
    "audio/flac",
  ];
  const allowedVideoTypes = [
    "video/mp4",
    "video/mpeg",
    "video/mov",
    "video/avi",
    "video/x-flv",
    "video/mpg",
    "video/webm",
    "video/wmv",
    "video/3gpp",
  ];
  const allowedTextTypes = [
    "text/plain",
    "text/html",
    "text/css",
    "text/javascript",
    "application/x-javascript",
    "text/x-typescript",
    "application/x-typescript",
    "text/csv",
    "text/markdown",
    "text/x-python",
    "application/x-python-code",
    "application/json",
    "text/xml",
    "application/rtf",
    "text/rtf",
  ];
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  const MAX_DURATION = 5 * 60; // 5 minutes

  const handleFileChange = async (event) => {
    setErrorMessage(null);
    const file = event.target.files[0];
    console.log(file);
    if (!file) {
      setSelectedFile(null);
      return;
    }
    setIsValidating(true);

    // File Type Validation
    if (
      !(
        allowedAudioTypes.includes(file.type) ||
        allowedImageTypes.includes(file.type) ||
        allowedVideoTypes.includes(file.type) ||
        allowedTextTypes.includes(file.type)
      )
    ) {
      setErrorMessage("Invalid file type. Please Choose another file type");
      setSelectedFile(null);
      setIsValidating(false);
      return;
    }

    // File Size Validation
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("File size too large. Maximum size is 50MB.");
      setSelectedFile(null);
      setIsValidating(false);
      return;
    }

    // Audio/Video Duration Validation
    if (
      allowedAudioTypes.includes(file.type) ||
      allowedVideoTypes.includes(file.type)
    ) {
      const media = document.createElement(
        allowedAudioTypes.includes(file.type) ? "audio" : "video"
      );
      media.preload = "metadata";
      media.src = URL.createObjectURL(file);

      media.onloadedmetadata = () => {
        URL.revokeObjectURL(media.src); // Clean up

        if (media.duration > MAX_DURATION) {
          setErrorMessage(
            "Audio/Video duration too long. Maximum duration is 5 minutes."
          );
          setSelectedFile(null);
        } else {
          setSelectedFile(file);
        }
        setIsValidating(false);
      };

      media.onerror = () => {
        setErrorMessage("Error loading media file.");
        setSelectedFile(null);
        setIsValidating(false);
      };
    } else {
      // For other file types, set the file immediately
      setSelectedFile(file);
      setIsValidating(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderTop: 1,
        borderColor: "divider",
        borderRadius: 8,
      }}
      component="form"
      onSubmit={onSendMessage}
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
            onChange={onInputChange}
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
                      disabled={isValidating}
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
                    accept={[].concat(
                      allowedImageTypes,
                      allowedAudioTypes,
                      allowedVideoTypes,
                      allowedTextTypes
                    )}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton
                  position="end"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={
                    (!inputMessage.trim() && !selectedFile) || isValidating
                  }
                >
                  <SendIcon fontSize="inherit" />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>
      {isValidating && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress size={20} />
        </Box>
      )}

      {errorMessage && (
        <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
          {errorMessage}
        </Typography>
      )}

      {selectedFile && !errorMessage && (
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
            <IconButton onClick={() => setSelectedFile(null)} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Paper>
  );
};

export default MessageInput;
