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

// Define allowed file types and constants
const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/heic",
  "image/heif",
];
const ALLOWED_AUDIO_TYPES = [
  "audio/wav",
  "audio/mp3",
  "audio/mpeg",
  "audio/x-m4a",
  "audio/aiff",
  "audio/aac",
  "audio/ogg",
  "audio/flac",
];
const ALLOWED_VIDEO_TYPES = [
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
const ALLOWED_TEXT_TYPES = [
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
const MAX_DURATION = 60 * 60; // 60 minutes

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

  // Function to validate file type, size, and duration
  const validateFile = (file) => {
    // File Type Validation
    if (
      !(
        ALLOWED_AUDIO_TYPES.includes(file.type) ||
        ALLOWED_IMAGE_TYPES.includes(file.type) ||
        ALLOWED_VIDEO_TYPES.includes(file.type) ||
        ALLOWED_TEXT_TYPES.includes(file.type)
      )
    ) {
      setErrorMessage("Invalid file type. Please choose another file.");
      return false;
    }

    // File Size Validation
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("File size too large. Maximum size is 50MB.");
      return false;
    }

    return true;
  };

  // Function to validate audio/video duration
  const validateMediaDuration = (file) => {
    return new Promise((resolve, reject) => {
      const media = document.createElement(
        ALLOWED_AUDIO_TYPES.includes(file.type) ? "audio" : "video"
      );
      media.preload = "metadata";
      media.src = URL.createObjectURL(file);

      media.onloadedmetadata = () => {
        URL.revokeObjectURL(media.src);
        if (media.duration > MAX_DURATION) {
          reject(
            new Error(
              "Audio/Video duration too long. Maximum duration is 1 hour."
            )
          );
        } else {
          resolve();
        }
      };

      media.onerror = () => {
        reject(new Error("Error loading media file."));
      };
    });
  };

  const handleFileChange = async (event) => {
    setErrorMessage(null);
    const file = event.target.files[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    setIsValidating(true);

    try {
      if (!validateFile(file)) {
        setSelectedFile(null);
        return;
      }

      // Validate duration for audio/video
      if (
        ALLOWED_AUDIO_TYPES.includes(file.type) ||
        ALLOWED_VIDEO_TYPES.includes(file.type)
      ) {
        await validateMediaDuration(file);
      }

      setSelectedFile(file);
    } catch (error) {
      setErrorMessage(error.message);
      setSelectedFile(null);
    } finally {
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
      <Grid container spacing={1} alignItems="center">
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
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    accept={[
                      ...ALLOWED_IMAGE_TYPES,
                      ...ALLOWED_AUDIO_TYPES,
                      ...ALLOWED_VIDEO_TYPES,
                      ...ALLOWED_TEXT_TYPES,
                    ]}
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
        {isValidating && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress size={20} />
          </Box>
        )}

        {errorMessage && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            sx={{ mt: 1 }}
          >
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
      </Grid>
    </Paper>
  );
};

export default MessageInput;