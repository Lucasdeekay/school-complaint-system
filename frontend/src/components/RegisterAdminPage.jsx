// src/components/RegisterAdminPage.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem } from '@mui/material';
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
      navigate('/login');
    } catch (error) {
      setError('Registration failed. User may already exist.');
      setMessage('');
    }
  };

  return (
    <Container>
      <h1>Register Admin</h1>
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
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
      {message && <Typography color="success" style={{ marginTop: '20px' }}>{message}</Typography>}
      {error && <Typography color="error" style={{ marginTop: '20px' }}>{error}</Typography>}
    </Container>
  );
};

export default RegisterAdminPage;
