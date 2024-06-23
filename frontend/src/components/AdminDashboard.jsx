// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button, MenuItem, Select } from '@mui/material';
import axios from 'axios';

const AdminDashboard = ({ token }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching admin complaints:', error);
      }
    };

    fetchComplaints();
  }, [token]);

  const handleClose = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/complaints/close/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status: 'closed' } : complaint
        )
      );
    } catch (error) {
      console.error('Error closing complaint:', error);
    }
  };

  const handleSetInReview = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/complaints/in-review/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status: 'in-review' } : complaint
        )
      );
    } catch (error) {
      console.error('Error setting complaint to in-review:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <List>
        {complaints.map((complaint) => (
          <ListItem key={complaint._id}>
            <ListItemText
              primary={complaint.title}
              secondary={`Matric Number: ${complaint.user.matricNumber} | Description: ${complaint.description} | Suggestion: ${complaint.suggestion} | Status: ${complaint.status}`}
            />
            <ListItemSecondaryAction>
              {complaint.status !== 'closed' && (
                <>
                  <Button variant="contained" color="primary" onClick={() => handleSetInReview(complaint._id)}>
                    Set In Review
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleClose(complaint._id)}>
                    Close
                  </Button>
                </>
              )}
              {complaint.status === 'in-review' && (
                <Select
                  value="in-review"
                  disabled
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value="in-review">In Review</MenuItem>
                </Select>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdminDashboard;
