// src/components/ForgotPasswordPage.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/forgot-password', { email });
      const { userId } = response.data;
      setError('');
      setOpen(true);
      navigate(`/reset-password/${userId}`);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
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
        <Typography variant="h3" component="h3" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Forgot Password
        </Typography>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '16px', margin: '16px' }}
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
            {error || 'Reset password instructions sent to your email.'}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
