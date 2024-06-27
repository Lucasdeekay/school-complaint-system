// src/components/ChangePasswordPage.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const ChangePasswordPage = ({ token }) => {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/change-password',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Password changed successfully!');
      setError('');
    } catch (error) {
      setError('Error changing password. Please try again.');
      setMessage('');
    }
  };

  return (
    <Container>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          name="oldPassword"
          label="Old Password"
          type="password"
          value={form.oldPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="newPassword"
          label="New Password"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Change Password
        </Button>
      </form>
      {message && <Typography color="success" style={{ marginTop: '20px' }}>{message}</Typography>}
      {error && <Typography color="error" style={{ marginTop: '20px' }}>{error}</Typography>}
    </Container>
  );
};

export default ChangePasswordPage;
