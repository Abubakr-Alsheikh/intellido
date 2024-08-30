import React from 'react';
import { Fab, Tooltip, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ClearChatButton = ({ onClearChat, isClearing }) => { 
  return (
    <Tooltip title="Clear Chat">
      <Fab 
        color="error" 
        aria-label="clear chat" 
        onClick={onClearChat} 
        sx={{ position: 'absolute', top: 32, left: 32 }}
        disabled={isClearing} // Disable button while clearing
      >
        {isClearing ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />} {/* Show loading indicator */}
      </Fab>
    </Tooltip>
  );
};

export default ClearChatButton;