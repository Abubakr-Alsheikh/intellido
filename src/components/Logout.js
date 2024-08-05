import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear Redux state
    navigate('/login'); 
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;