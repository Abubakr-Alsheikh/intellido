import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'; 
import { fetchTasks, deleteTask, toggleTaskCompletion } from '../redux/slices/tasksSlice'; // Adjust import paths
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 
import EditIcon from '@mui/icons-material/Edit';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks); // Access tasks from Redux store
  const isLoading = useSelector((state) => state.tasks.isLoading); // Access loading state
  const error = useSelector((state) => state.tasks.error); // Access error state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Check for login state

  useEffect(() => {
    dispatch(fetchTasks()); // Fetch tasks when the component mounts
  }, [dispatch]); 

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggleComplete = (taskId) => {
    dispatch(toggleTaskCompletion(taskId)); 
  };

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login if not logged in
  }

  return (
    <div>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox
              checked={task.is_completed} 
              onChange={() => handleToggleComplete(task.id)}
            />
            <ListItemText primary={task.title} secondary={task.description} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" component={Link} to={`/edit-task/${task.id}`}> 
                <EditIcon /> 
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button component={Link} to="/add-task" variant="contained" color="primary">
        Add Task
      </Button>
    </div>
  );
};

export default TaskList;