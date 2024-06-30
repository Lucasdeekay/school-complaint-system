// src/components/RegisterAdminPage.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Snackbar, Alert, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Issues of examination-related matters',
  'Lecture Hall matters',
  'Lecturer-related feedback',
  'Hostel issues',
  'Cafeteria concerns',
  'Miscellaneous concerns'
];

const RegisterAdminPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    category: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register-admin', form);
      setMessage('Registration successful!');
      setError('');
      setOpen(true);
      navigate('/login');
    } catch (error) {
      setError('Registration failed. User may already exist.');
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
          Register Admin
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="firstName"
            label="First Name"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="email"
            label="Email"
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
          <TextField
            name="category"
            label="Category"
            value={form.category}
            onChange={handleChange}
            select
            fullWidth
            margin="normal"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '16px' }}
          >
            Register
          </Button>
        </form>
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: '16px' }}
        >
          Already have an account?{' '}
          <Link href="/login" variant="body2">
            Login here
          </Link>
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: '16px' }}
        >
          Are you a student?{' '}
          <Link href="/register" variant="body2">
            Register Now
          </Link>
        </Typography>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity={message ? 'success' : 'error'} sx={{ width: '100%' }}>
            {message || error}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default RegisterAdminPage;
