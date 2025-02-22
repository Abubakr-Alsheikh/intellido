import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../redux/slices/tasksSlice";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress, 
} from "@mui/material";

const AddTaskDialog = ({ openAddDialog, setOpenAddDialog, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleClickOpen = () => {
    setOpenAddDialog(true);
  };

  const handleClose = () => {
    setOpenAddDialog(false);
    setFormData({ title: "", description: "" }); 
    setError(null); 
    setIsLoading(false); // Reset loading state on close
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true
    setError(null);

    try {
      await dispatch(createTask(formData)).unwrap();
      handleClose();
    } catch (err) {
      setError(err.message || "Failed to add task");
    } finally {
      setIsLoading(false); // Set loading to false after request
    }
  };

  return (
    <Dialog open={openAddDialog} onClose={onClose} fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>Add New Task</DialogTitle>
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
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={isLoading || !formData.title} // Disable if loading or title is empty
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Add Task'} 
            </Button>
            <Button 
              onClick={handleClose} 
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

export default AddTaskDialog;