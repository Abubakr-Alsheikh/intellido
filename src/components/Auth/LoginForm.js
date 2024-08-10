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
  InputAdornment,
  IconButton 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { API_BASE_URL } from '../../services/api';
import { login } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}api/token/`, {
        username,
        password,
      });
      dispatch(login(response.data));
      setError(null);
      navigate('/home/tasks'); 
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.detail || 'Invalid credentials'); 
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> 
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: '100%' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Login
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {/* Display the specific error message from the backend */}
            {error} 
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
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            sx={{ mt: 2, mb: 2 }} 
            disabled={!username || !password} 
          >
            Login
          </Button>

          <Typography variant="body2" align="center">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;