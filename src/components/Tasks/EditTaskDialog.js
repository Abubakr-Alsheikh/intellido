import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../redux/slices/tasksSlice';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';

const EditTaskDialog = ({ task, onClose }) => { // Receive task from props
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ 
    title: task ? task.title : '', 
    description: task ? task.description : '' 
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateTask({ id: task.id, ...formData })).unwrap(); 
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update task');
    }
  };

  return (
    <Dialog open={!!task} onClose={onClose} fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>Edit Task</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
            <Button onClick={onClose} variant="outlined" color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;