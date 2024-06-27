// src/components/Navbar.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StatusIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const AuthNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <div
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{
        width: 250,
        backgroundColor: theme.palette.primary.main,
        height: "100%",
      }}
    >
      <List>
        <ListItem
          Button
          component={Link}
          to="/forgot-password"
          sx={{
            color: "white",
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          <ListItemIcon>
            <StatusIcon sx={{ color: "white", marginLeft: "15px" }} />
          </ListItemIcon>
          <ListItemText primary="Forgot Password" />
        </ListItem>
        <ListItem
          Button
          component={Link}
          to="/register"
          sx={{
            color: "white",
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          <ListItemIcon>
            <SettingsIcon sx={{ color: "white", marginLeft: "15px" }} />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </ListItem>
      </List>
      <List>
      <ListItem
          Button
          component={Link}
          to="/register-admin"
          sx={{
            color: "white",
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          <ListItemIcon>
            <SettingsIcon sx={{ color: "white", marginLeft: "15px" }} />
          </ListItemIcon>
          <ListItemText primary="Admin" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {isMobile ? (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Button edge="start" color="inherit" component={Link} to="/" style={{ flexGrow: 1, padding: "0px", margin: "0px" }}>
            School Complaint System
          </Button>
          {isMobile ? null : (
            <>
              <Button color="inherit" component={Link} to="/forgot-password">
                Forgot Password
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
              <Button color="inherit" component={Link} to="/register-admin">
                Admin
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default AuthNavbar;
