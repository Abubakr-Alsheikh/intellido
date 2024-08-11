import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ClearChatButton = ({ onClearChat }) => {
  return (
    <Tooltip title="Clear Chat">
      <Fab 
        color="error" 
        aria-label="clear chat" 
        onClick={onClearChat} 
        sx={{ position: 'absolute', top: 32, left: 32 }} 
      >
        <DeleteIcon />
      </Fab>
    </Tooltip>
  );
};

export default ClearChatButton;