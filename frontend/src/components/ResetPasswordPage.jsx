// src/components/ResetPasswordPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const ResetPasswordPage = () => {
  const { userId } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/reset-password', { userId, newPassword: password });
      setMessage('Password reset successfully.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <Container>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          name="password"
          label="New Password"
          type="password"
          value={password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Reset Password
        </Button>
      </form>
      {error && <Typography color="error" style={{ marginTop: '20px' }}>{error}</Typography>}
      {message && <Typography style={{ marginTop: '20px' }}>{message}</Typography>}
    </Container>
  );
};

export default ResetPasswordPage;
