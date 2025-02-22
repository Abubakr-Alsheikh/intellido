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
  CircularProgress,
} from '@mui/material';

const EditTaskDialog = ({ task, onClose }) => { 
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ 
    title: task ? task.title : '', 
    description: task ? task.description : '' 
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true
    setError(null); 

    try {
      await dispatch(updateTask({ id: task.id, ...formData })).unwrap(); 
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update task');
    } finally {
      setIsLoading(false); // Set loading to false after request
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
            disabled={isLoading} // Disable while loading
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
            disabled={isLoading} // Disable while loading
          />
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={isLoading || !formData.title} // Disable if loading or title is empty
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'} 
            </Button>
            <Button 
              onClick={onClose} 
              variant="outlined" 
              color="secondary"
              disabled={isLoading} // Disable while loading
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;