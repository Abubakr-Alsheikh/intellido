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
} from "@mui/material";

const AddTaskDialog = ({ openAddDialog, setOpenAddDialog, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [error, setError] = useState(null);

  const handleClickOpen = () => {
    setOpenAddDialog(true);
  };

  const handleClose = () => {
    setOpenAddDialog(false);
    setFormData({ title: "", description: "" }); // Reset form data
    setError(null); // Reset error
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createTask(formData)).unwrap();
      handleClose();
    } catch (err) {
      setError(err.message || "Failed to add task");
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
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Add Task
            </Button>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
