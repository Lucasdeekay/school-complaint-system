// src/components/HomePage.js
import React from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';

const HomePage = ({ token }) => {
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
      <Container sx={{ color: 'white' }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Welcome to Dominion University Complaint System
        </Typography>
        <Typography variant="h6" component="p" align="center" gutterBottom>
          Use this system to submit and track complaints related to various aspects of university life.
        </Typography>

        <Box my={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt="Submit Complaint"
                  height="140"
                  image="https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=600"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Submit a Complaint
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Report any issues you encounter at Dominion University, from facilities to academic matters.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt="Track Complaints"
                  height="140"
                  image="https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=600"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Track Your Complaints
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Follow the status of your complaints and get updates from the university administration.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  alt="Support System"
                  height="140"
                  image="https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg?auto=compress&cs=tinysrgb&w=600"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Support System
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get your complaints and suggestions across to the management at Dominion University.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box mt={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            How to Use the Complaint System
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Follow these steps to submit and track your complaints:
          </Typography>
          <ol>
            <li>
              <Typography variant="body1" component="p">
                Log in to your account.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                Navigate to the "Submit Complaint" section.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                Fill in the complaint form with all necessary details.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                Submit the form and wait for a response from the university administration.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                Track the status of your complaint in the "Track Complaints" section.
              </Typography>
            </li>
          </ol>
        </Box>

        <Box mt={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            If you have any questions or need further assistance, please contact our support team at <a href="mailto:support@dominionuniversity.com" style={{ color: 'white' }}>support@dominionuniversity.com</a> or call us at <a href="tel:+1234567890" style={{ color: 'white' }}>(123) 456-7890</a>.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
