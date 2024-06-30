// src/components/Navbar.js
import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  useMediaQuery,
  Tooltip,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ReportIcon from "@mui/icons-material/Report";
import StatusIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";

const Navbar = ({ handleLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '20px 0',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Avatar
          alt="School Logo"
          src="/images/logo.png"
          sx={{
            width: 60,
            height: 60,
            backgroundColor: 'white',
            border: '2px solid white',
            mb: 1,
          }}
        />
        <Typography variant="strong" color="white">
          School Complaint System
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.34)' }} />
      <List>
        <ListItem
          Button
          component={Link}
          to="/home"
          sx={{
            color: "white",
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: "white", marginLeft: "15px" }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          Button
          component={Link}
          to="/complaints"
          sx={{
            color: "white",
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          <ListItemIcon>
            <ReportIcon sx={{ color: "white", marginLeft: "15px" }} />
          </ListItemIcon>
          <ListItemText primary="Submit Complaint" />
        </ListItem>
        <ListItem
          Button
          component={Link}
          to="/status"
          sx={{
            color: "white",
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          <ListItemIcon>
            <StatusIcon sx={{ color: "white", marginLeft: "15px" }} />
          </ListItemIcon>
          <ListItemText primary="Track Complaints" />
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ my: 1 }}>
          {isMobile ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <IconButton sx={{ mr: 2 }}>
            <Avatar
              alt="School Logo"
              src="/images/logo.png"
              sx={{
                width: 40,
                height: 40,
                backgroundColor: 'white',
                border: '2px solid white',
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
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Home" sx={{ mr: 2 }}>
              <IconButton
                component={Link}
                to="/home"
                size="large"
                color="inherit"
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Submit Complaint" sx={{ mr: 2 }}>
              <IconButton
                component={Link}
                to="/complaints"
                size="large"
                color="inherit"
              >
                <ReportIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Track Complaints" sx={{ mr: 2 }}>
              <IconButton
                component={Link}
                to="/status"
                size="large"
                color="inherit"
              >
                <StatusIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Change Password" sx={{ mr: 2 }}>
              <IconButton
                component={Link}
                to="/change-password"
                size="large"
                color="inherit"
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout" sx={{ mr: 2 }}>
              <IconButton
                onClick={handleLogoutClick}
                size="large"
                color="inherit"
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Navbar;
