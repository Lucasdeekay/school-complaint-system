// src/components/Navbar.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const AuthNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ my: 1 }}>
          <IconButton sx={{ mr: 2 }}>
          <Avatar
              alt="School Logo"
              src="/images/logo.png"
              sx={{
                width: 50,
                height: 50,
                backgroundColor: 'white',
                border: '1px solid white',
              }}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            School Complaint System
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AuthNavbar;
