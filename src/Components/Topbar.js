import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import "./Topbar.css";

const pages = ["Home", "About Us", "Wedding Party", "Events", "RSVP"];
const pageLinks = {
  Home: "/",
  "About Us": "/about",
  "Wedding Party": "/party",
  Events: "/events",
  RSVP: "/rsvp",
};

function Topbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" className="topbar-container">
      <Container style={{ height: 64 }}>
        <Box
          sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          className="topbar"
        >
          <IconButton
            size="large"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <NavLink to={pageLinks[page]} className="small-nav-link">
                  {page}
                </NavLink>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          className="topbar"
        >
          {pages.map((page) => (
            <NavLink to={pageLinks[page]} className="nav-link">
              {page}
            </NavLink>
          ))}
        </Box>
      </Container>
    </AppBar>
  );
}

export default Topbar;
