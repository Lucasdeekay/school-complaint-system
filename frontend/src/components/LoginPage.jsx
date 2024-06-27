// src/components/LoginPage.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setToken }) => {
  const [form, setForm] = useState({ email: '', password: '' });
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
    }
  };

  return (
    <Container>
      <h1>Login</h1>
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
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      {error && <Typography color="error" style={{ marginTop: '20px' }}>{error}</Typography>}
    </Container>
  );
};

export default LoginPage;
