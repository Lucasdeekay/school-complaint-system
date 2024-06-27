// src/components/Navbar.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
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
import LogoutIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const AdminNavbar = ({ handleLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
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
          to="/admin"
          sx={{
            color: "white",
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          <ListItemIcon>
            <StatusIcon sx={{ color: "white", marginLeft: "15px" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          Button
          component={Link}
          to="/change-password"
          sx={{
            color: "white",
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          <ListItemIcon>
            <SettingsIcon sx={{ color: "white", marginLeft: "15px" }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <ListItem
        Button
        onClick={handleLogoutClick}
        sx={{
          color: "white",
          "&:hover": { backgroundColor: theme.palette.primary.dark },
          position: "absolute",
          bottom: 0,
          borderTop: "1px solid rgba(255, 255, 255, 0.34)",
          cursor: "pointer",
        }}
      >
        <ListItemIcon>
          <LogoutIcon sx={{ color: "white", marginLeft: "15px" }} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
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
          <Typography variant="h5" style={{ flexGrow: 1, padding: "5px" }}>
            School Complaint System
          </Typography>
          {isMobile ? null : (
            <>
              <Button color="inherit" component={Link} to="/admin">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/change-password">
                Settings
              </Button>
            </>
          )}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleLogoutClick}
            sx={{ marginLeft: "50px" }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default AdminNavbar;
