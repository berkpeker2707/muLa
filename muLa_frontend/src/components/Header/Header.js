import React, { Fragment } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom"
import "../../App.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../state/actions/authActions";

const Header = ({ auth: { isAuthenticated, isLoading }, logout }) => {

  const authLinks = (
    <Navbar className="HeaderNavbar" expand="lg">
      <Link to={"/dashboard"}>
        <Navbar.Brand style={{ color: "#f5f0e1" }}>FriendshipApp</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link className="HeaderNavLink" href="/profile">Profile</Nav.Link>
          <Nav.Link className="HeaderNavLink" href="/chatroom">Chat</Nav.Link>
          <Nav.Link className="HeaderNavLink" href="/settings">Settings</Nav.Link>
          <Nav.Link onClick={logout} className="HeaderNavLink" href="#!">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  const guestLinks = (
    <Navbar className="HeaderNavbar" expand="lg">
      <Link to={"/"}>
        <Navbar.Brand style={{ color: "#d2fdff" }}>FriendshipApp</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link className="HeaderNavLink" href="/register">Register</Nav.Link>
          <Nav.Link className="HeaderNavLink" href="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );


  return (
    <div className="HeaderComponent">
      {!isLoading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
    </div>

  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { logout })(Header);