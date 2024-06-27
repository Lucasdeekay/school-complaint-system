// src/components/RegisterPage.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    matricNumber: '',
    email: '',
    password: ''
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
      await axios.post('http://localhost:5000/register', form);
      setError('');
      navigate('/login');
    } catch (error) {
      setError('Registration failed. User may already exist.');
      setMessage('');
    }
  };

  return (
    <Container>
      <h1>Register</h1>
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
          name="matricNumber"
          label="Matric Number"
          value={form.matricNumber}
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
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
      {message && <Typography color="success" style={{ marginTop: '20px' }}>{message}</Typography>}
      {error && <Typography color="error" style={{ marginTop: '20px' }}>{error}</Typography>}
    </Container>
  );
};

export default RegisterPage;
