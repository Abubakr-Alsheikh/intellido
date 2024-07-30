import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { updateTask } from '../redux/slices/tasksSlice'; 
import { TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import * as api from "../services/api"; // Import your API functions

const EditTaskForm = () => {
  const { taskId } = useParams(); // Get taskId from URL parameters
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(true); 

  // Fetch task details when the component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.fetchTask(taskId); // You'll need to create api.fetchTask
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId]); 

  const handleClose = () => {
    setOpen(false);
    navigate('/tasks'); // Navigate back to task list on close
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateTask({ id: taskId, title, description, is_completed: false })) 
      .then(() => handleClose()); 
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskForm;