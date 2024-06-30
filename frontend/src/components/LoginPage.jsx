// src/components/LoginPage.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setToken }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', form);
      setToken(response.data.token);
      response.data.userType === 'admin' ? navigate('/admin') : navigate('/home');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '16px',
            }}
          >
            <Link href="/forgot-password" variant="body2">
              Forgot Password?
            </Link>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '16px' }}
          >
            Login
          </Button>
        </form>
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: '16px' }}
        >
          Don't have an account?{' '}
          <Link href="/register" variant="body2">
            Register here
          </Link>
        </Typography>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          { error }
        </Alert>
      </Snackbar>
      </Container>
    </Box>
  );
};

export default LoginPage;
