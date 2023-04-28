import React, { memo, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { useLanguageSelector } from "../../hooks/useLanguageSelector";
import { NavLink } from "react-router-dom";
import actions from "../../actions/languageAction";
import "./Topbar.css";

function Topbar() {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorLang, setAnchorLang] = useState(null);
  const { textLang } = useLanguageSelector("nav");

  const openLang = Boolean(anchorLang);

  const handleClick = (event) => {
    setAnchorLang(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorLang(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleChangeLanguage = (newLang) => {
    if (newLang === "English") {
      dispatch(actions.changeLanguage("En"));
      localStorage.removeItem("wang-wedding-lang");
    } else {
      dispatch(actions.changeLanguage("Zh"));
      localStorage.setItem("wang-wedding-lang", "Zh");
    }
    handleClose();
  };

  const langMenu = (
    <>
      <Button id="lang-menu" onClick={handleClick} style={{ right: 0 }}>
        {textLang.changeLanguage}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorLang}
        open={openLang}
        onClose={handleClose}
        disableScrollLock={true}
      >
        {textLang.languageMenu.map((elem) => {
          return (
            <MenuItem
              className="lang-menu-item"
              onClick={() => {
                handleChangeLanguage(elem);
              }}
            >
              {elem}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );

  return (
    <AppBar position="fixed" className="topbar-container">
      <Container style={{ height: 64 }}>
        <Toolbar disableGutters style={{ height: 64 }}>
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
              disableScrollLock={true}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {textLang.pages.map((page) => {
                return (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <NavLink
                      to={textLang.pageLinks[page]}
                      className="small-nav-link"
                    >
                      {page}
                    </NavLink>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            className="topbar"
          >
            {textLang.pages.map((page) => {
              return (
                <NavLink to={textLang.pageLinks[page]} className="nav-link">
                  {page}
                </NavLink>
              );
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }} className="topbar">
            {langMenu}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default memo(Topbar);
