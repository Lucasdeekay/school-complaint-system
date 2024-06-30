// src/components/ComplaintsPage.js
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const categories = [
  'Issues of examination-related matters',
  'Lecture Hall matters',
  'Lecturer-related feedback',
  'Hostel issues',
  'Cafeteria concerns',
  'Miscellaneous concerns'
];

const ComplaintsPage = ({ token }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    suggestion: '',
    category: ''
  });
  const [open, setOpen] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({ message: '', severity: 'success' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/complaints', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSnackbarInfo({ message: 'Complaint submitted successfully!', severity: 'success' });
      setForm({ title: '', description: '', suggestion: '', category: '' });
    } catch (error) {
      setSnackbarInfo({ message: 'Error submitting complaint. Please try again.', severity: 'error' });
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
          <Typography variant="h4" component="h1" align='center' gutterBottom sx={{ fontWeight: 'bold' }}>
            Submit a Complaint or Suggestion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              name="title"
              label="Title"
              value={form.title}
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
            <TextField
              name="description"
              label="Description"
              multiline
              rows={4}
              value={form.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="suggestion"
              label="Suggestion"
              multiline
              rows={4}
              value={form.suggestion}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Submit
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

export default ComplaintsPage;
