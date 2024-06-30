// src/components/ResetPasswordPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const ResetPasswordPage = () => {
  const { userId } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
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
      setError('');
      setOpen(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
      setMessage('');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(https://images.pexels.com/photos/3184163/pexels-photo-3184163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent background
          padding: '20px',
          borderRadius: '8px',
          width: {
            xs: '80%', // small screen
            md: '50%', // medium to large screen
          },
        }}
      >
        <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Reset Password
        </Typography>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '16px', marginBottom: '16px' }}
          >
            Reset Password
          </Button>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
            {error || message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ResetPasswordPage;
