import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import {
  FaComments,
  FaMehBlank,
  FaBeer,
  FaSmoking,
  FaVenusMars,
  FaLanguage,
  FaPray,
  FaPrayingHands,
  FaFlag,
  FaUtensils,
  FaBirthdayCake,
  FaBriefcase,
  FaPersonBooth,
  FaLocationArrow,
} from "react-icons/fa";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getUsersAction } from "../../state/slices/authSlices";

import { Navbar, Nav } from "react-bootstrap";

const Header = ({ auth: { isAuthenticated, isLoading }, logout }) => {
  const authLinks = (
    <Navbar className="HeaderNavbar" expand="lg">
      <Link to={"/dashboard"}>
        <Navbar.Brand style={{ color: "#f5f0e1" }}>FriendshipApp</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link className="HeaderNavLink" href="/profile">
            Profile
          </Nav.Link>
          <Nav.Link className="HeaderNavLink" href="/chatroom">
            Chat
          </Nav.Link>
          <Nav.Link className="HeaderNavLink" href="/settings">
            Settings
          </Nav.Link>
          <Nav.Link onClick={logout} className="HeaderNavLink" href="#!">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  const guestLinks = (
    <Navbar className="HeaderNavbar" expand="lg">
      <Link to={"/"}>
        <Navbar.Brand style={{ color: "#d2fdff" }}>FriendshipApp</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link className="HeaderNavLink" href="/register">
            Register
          </Nav.Link>
          <Nav.Link className="HeaderNavLink" href="/login">
            Login
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  return (
    <div className="HeaderComponent">
      {!isLoading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </div>
  );
};

export default Header;
