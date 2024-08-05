import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import { API_BASE_URL} from '../services/api'
import { login } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}api/signup/`, {
        username,
        password,
      });
      // Store tokens in Redux store
      dispatch(login(response.data)); 
      setError(null);
      navigate('/tasks');
    } catch (error) {
      setError(error.response?.data?.detail || 'Failed to create user');
    }
  };

  return (
    <div>
      <Typography variant="h5" component="h2">
        Sign Up
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;