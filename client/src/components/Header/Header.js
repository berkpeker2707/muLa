import React, { Fragment } from "react";
import "../../App.css";

//@mui imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

//redux & state management
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../state/slices/authSlices";

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth?.userAuth);

  const logout = async () => {
    dispatch(logoutAction());
  };

  const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      style={{ backgroundColor: "#1e3d59" }}
    >
      <Link
        href="/dashboard"
        style={{ color: "white", textDecoration: "none" }}
      >
        <Typography variant="h6" sx={{ my: 2 }}>
          muLa
        </Typography>
      </Link>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link
            href="/profile"
            style={{ color: "white", textDecoration: "none" }}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Profile"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link href="/chat" style={{ color: "white", textDecoration: "none" }}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Chat"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            href="/settings"
            style={{ color: "white", textDecoration: "none" }}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Settings"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link href="/" style={{ color: "white", textDecoration: "none" }}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Logout"} onClick={() => logout()} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  const authLinks = (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" style={{ backgroundColor: "#1e3d59" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link
              href="/dashboard"
              underline="none"
              style={{ color: "white", textDecoration: "none" }}
            >
              muLa
            </Link>
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              sx={{ color: "#fff", textDecoration: "none" }}
              href="/profile"
            >
              {"Profile"}
            </Button>
            <Button sx={{ color: "#fff", textDecoration: "none" }} href="/chat">
              {"Chat"}
            </Button>
            <Button
              sx={{ color: "#fff", textDecoration: "none" }}
              href="/settings"
            >
              {"Settings"}
            </Button>
            <Button
              sx={{ color: "#fff", textDecoration: "none" }}
              href="/"
              onClick={() => logout()}
            >
              {"Logout"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* for smaller screens section starts  */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1e3d59",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      {/* for smaller screens section ends  */}
    </Box>
  );

  return (
    <div className="HeaderComponent">
      {user ? authLinks : <Fragment></Fragment>}
    </div>
  );
};

export default Header;
