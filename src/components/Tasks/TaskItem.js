import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Import an icon
import EditTaskDialog from './EditTaskDialog';

const TaskItem = ({ task, onDelete, onToggleComplete }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteClick = () => {
    dispatch(onDelete(task.id));
  };

  const handleToggleCompleteClick = () => {
    dispatch(onToggleComplete(task.id));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <ListItem 
      sx={{ 
        borderRadius: 2, 
        mb: 1, 
        boxShadow: 1, // Add a subtle box shadow
        backgroundColor: task.is_completed ? 'background.default' : 'background.paper' // Change background if completed
      }}
    >
      <Checkbox
        checked={task.is_completed}
        onChange={handleToggleCompleteClick}
        icon={<CheckCircleOutlineIcon />} // Use a custom icon 
        checkedIcon={<CheckCircleOutlineIcon color="primary" />} 
        sx={{ mr: 2 }} // Add margin-right 
      />
      <ListItemText
        primary={
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: task.is_completed ? 'normal' : 'medium', // Adjust font weight
              textDecoration: task.is_completed ? 'line-through' : 'none' 
            }}
          >
            {task.title}
          </Typography>
        }
        secondary={
          task.description && (
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
          )
        }
        sx={{ flexGrow: 1 }} // Allow text to take up available space
      />
      <ListItemSecondaryAction>
        <Tooltip title="Edit"> 
          <IconButton edge="end" aria-label="edit" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>

      {isEditing && (
        <EditTaskDialog task={task} onClose={handleCloseEdit} />
      )}
    </ListItem>
  );
};

export default TaskItem;