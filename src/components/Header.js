import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Switch,
  Box,
  styled,
  FormControlLabel,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import logo from "../images/logo.png";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const Header = ({ toggleTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navLinks = [
    { to: "/home/ai-chat", text: "AI Chat", icon: <ChatIcon /> },
    { to: "/home/tasks", text: "Tasks", icon: <HomeIcon /> },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: 32,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add shadow for depth
        backgroundColor: "background.paper", // Use background color from theme
        color: "text.primary", // Use text color from theme
        pt: 0.5,
        pb: 0.5,
      }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Logo (optional - replace with your logo) */}
          <img
            srcSet={logo}
            src={logo}
            alt="logo"
            loading="lazy"
            width={48}
            height={48}
          />

          <Typography
            variant="h6"
            component="div"
            sx={{
              ml: 2,
              fontWeight: "bold",
            }}
            color="secondary"
          >
            IntelliDo
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
          onChange={toggleTheme}
        />
        {isMobile ? (
          // Mobile Navigation
          <MobileNavigation
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
            navLinks={navLinks}
            handleLogout={handleLogout}
          />
        ) : (
          // Desktop Navigation
          <DesktopNavigation navLinks={navLinks} handleLogout={handleLogout} />
        )}
      </Toolbar>
    </AppBar>
  );
};

// Mobile Navigation Component
const MobileNavigation = ({
  drawerOpen,
  toggleDrawer,
  navLinks,
  handleLogout,
}) => (
  <>
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={toggleDrawer}
    >
      <MenuIcon />
    </IconButton>
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
      <List>
        {navLinks.map((link) => (
          <ListItem
            button
            key={link.text}
            component={NavLink}
            to={link.to}
            onClick={toggleDrawer}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.text} sx={{}} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  </>
);

// Desktop Navigation Component
const DesktopNavigation = ({ navLinks, handleLogout }) => (
  <>
    {navLinks.map((link) => (
      <Button
        key={link.text}
        component={NavLink}
        to={link.to}
        color="inherit"
        sx={{ marginRight: 2 }}
      >
        {link.text}
      </Button>
    ))}
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  </>
);

export default Header;
