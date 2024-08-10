import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Box,
  Alert,
  Paper,
  InputAdornment,  // For icons in TextFields
  IconButton       // For visibility toggle
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { API_BASE_URL } from '../../services/api';
import { login } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}api/signup/`, {
        username,
        password, 
      });
      dispatch(login(response.data));
      setError(null);
      navigate('/intellido/home/tasks'); 
    } catch (error) {
      setError(error.response?.data?.detail || 'Failed to create user');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: '100%' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Sign Up
          </Typography>
        </Box>

        {error && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {/* Check if the error is for username specifically */}
        {error.username && typeof error.username === 'object' 
          ? error.username[0] // Access the error message from the array
          : 'Failed to create user'} 
      </Alert>
    )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />} 
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            disabled={!username || !password || !confirmPassword} 
          >
            Sign Up
          </Button>

          <Typography variant="body2" align="center">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupForm;