// src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from "@mui/material";
import axios from "axios";

const AdminDashboard = ({ token }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/complaints/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching admin complaints:", error);
      }
    };

    fetchComplaints();
  }, [token]);

  const handleClose = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/complaints/close/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status: "closed" } : complaint
        )
      );
    } catch (error) {
      console.error("Error closing complaint:", error);
    }
  };

  const handleSetInReview = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/complaints/review/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id
            ? { ...complaint, status: "in-review" }
            : complaint
        )
      );
    } catch (error) {
      console.error("Error setting complaint to in-review:", error);
    }
  };

  return (
    <>
      <Container>
        <List>
          {complaints.map((complaint) => (
            <ListItem key={complaint._id}>
              <ListItemText
                primary={complaint.title}
                secondary={`Matric Number: ${complaint.user.matricNumber} | Description: ${complaint.description} | Suggestion: ${complaint.suggestion} | Status: ${complaint.status}`}
              />
              <ListItemSecondaryAction>
                {complaint.status === "open" && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSetInReview(complaint._id)}
                    >
                      Set In Review
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleClose(complaint._id)}
                    >
                      Close
                    </Button>
                  </>
                )}
                {complaint.status === "in-review" && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleClose(complaint._id)}
                  >
                    Close
                  </Button>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default AdminDashboard;
