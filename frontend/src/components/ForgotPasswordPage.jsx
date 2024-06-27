// src/components/ForgotPasswordPage.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/forgot-password', { email });
      const { userId } = response.data;
      navigate(`/reset-password/${userId}`);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <Container>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Reset Password
        </Button>
      </form>
      {error && <Typography color="error" style={{ marginTop: '20px' }}>{error}</Typography>}
    </Container>
  );
};

export default ForgotPasswordPage;
