// src/components/ComplaintStatusPage.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import axios from 'axios';

const ComplaintStatusPage = ({ token }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints/status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, [token]);

  const handleReopen = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/complaints/reopen/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status: 'open' } : complaint
        )
      );
    } catch (error) {
      console.error('Error reopening complaint:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Complaint Status
      </Typography>
      <List>
        {complaints.map((complaint) => (
          <ListItem key={complaint._id}>
            <ListItemText
              primary={complaint.title}
              secondary={`Description: ${complaint.description} | Suggestion: ${complaint.suggestion} | Status: ${complaint.status}`}
            />
            {complaint.status === 'closed' && (
              <ListItemSecondaryAction>
                <Button variant="contained" color="primary" onClick={() => handleReopen(complaint._id)}>
                  Reopen
                </Button>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ComplaintStatusPage;
