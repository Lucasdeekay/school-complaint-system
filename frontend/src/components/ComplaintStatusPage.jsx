// src/components/ComplaintStatusPage.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Paper,
  Snackbar,
  Alert,
  Button,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import axios from 'axios';

const ComplaintStatusPage = ({ token }) => {
  const [complaints, setComplaints] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({ message: '', severity: 'success' });

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/complaints/get', {
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
      await axios.patch(`http://localhost:5000/complaints/reopen/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status: 'open' } : complaint
        )
      );
      setSnackbarInfo({ message: 'Complaint reopened successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error reopening complaint:', error);
      setSnackbarInfo({ message: 'Error reopening complaint. Please try again.', severity: 'error' });
    } finally {
      setOpenSnack(true);
    }
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
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
          backgroundImage: 'url(https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
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
      <Container maxWidth="lg" sx={{ zIndex: 1 }}>
        <Box sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Track Complaints
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints.map((complaint) => (
                  <ComplaintRow key={complaint._id} complaint={complaint} onReopen={handleReopen} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleCloseSnack} severity={snackbarInfo.severity} sx={{ width: '100%' }}>
              {snackbarInfo.message}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </Box>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'closed':
      return 'green';
    case 'in-review':
      return 'blue';
    case 'open':
      return 'red';
    default:
      return 'black';
  }
};

const ComplaintRow = ({ complaint, onReopen }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>{complaint.title}</TableCell>
        <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: getStatusColor(complaint.status) }}>
          {complaint.status}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="h1" sx={{ fontWeight: 'bold' }}>
                Description
              </Typography>
              <Typography variant="body1" gutterBottom>
                {complaint.description}
              </Typography>
              <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                Suggestion
              </Typography>
              <Typography variant="body1" gutterBottom>
                {complaint.suggestion}
              </Typography>
              {complaint.status === 'closed' && (
                <Box sx={{ my: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onReopen(complaint._id)}
                    fullWidth
                  >
                    Reopen
                  </Button>
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ComplaintStatusPage;
