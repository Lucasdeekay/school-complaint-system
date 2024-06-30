// src/components/AdminChangePasswordPage.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const AdminChangePasswordPage = ({ token }) => {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '' });
  const [open, setOpen] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({ message: '', severity: 'success' });

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
      setSnackbarInfo({ message: 'Password changed successfully!', severity: 'success' });
    } catch (error) {
      setSnackbarInfo({ message: 'Error changing password. Please try again.', severity: 'error' });
    } finally {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        minHeight: '100vh',
        padding: '40px 0',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://images.pexels.com/photos/159497/school-notebook-binders-notepad-159497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // dark overlay
          }}
        />
      </Box>
      <Container maxWidth="sm" sx={{ zIndex: 1 }}>
        <Box sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2 }}>
          <Typography variant="h4"  align='center' component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Change Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
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
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Change Password
            </Button>
          </Box>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity={snackbarInfo.severity} sx={{ width: '100%' }}>
              {snackbarInfo.message}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminChangePasswordPage;
