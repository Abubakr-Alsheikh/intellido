import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { createTask } from '../redux/slices/tasksSlice'; 
import { TextField, Button, Typography, Container } from '@mui/material';

const AddTaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createTask({ title, description })).unwrap(); 
      // Optionally, clear the form fields after successful submission
      setTitle('');
      setDescription('');
      // Redirect to the task list
      navigate('/tasks'); 
    } catch (error) {
      // Handle errors (e.g., display error message)
      console.error("Failed to create task:", error); 
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        Add New Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4} 
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Task
        </Button>
      </form>
    </Container>
  );
};

export default AddTaskForm;