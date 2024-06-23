// src/components/ComplaintsPage.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem } from '@mui/material';
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
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/complaints', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Complaint submitted successfully!');
      setError('');
      setForm({ title: '', description: '', suggestion: '', category: '' });
    } catch (error) {
      setError('Error submitting complaint. Please try again.');
      setMessage('');
    }
  };

  return (
    <Container>
      <h1>Submit a Complaint or Suggestion</h1>
      <form onSubmit={handleSubmit}>
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
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      {message && <Typography color="success" style={{ marginTop: '20px' }}>{message}</Typography>}
      {error && <Typography color="error" style={{ marginTop: '20px' }}>{error}</Typography>}
    </Container>
  );
};

export default ComplaintsPage;
