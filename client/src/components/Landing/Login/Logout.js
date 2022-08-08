import React, { Component } from "react";
import { logout } from "../../../state/actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };
  render() {
    return (
      <div>
        <Link onClick={this.props.logout}>Logout</Link>
        <Redirect exact to="/" />;
      </div>
    );
  }
}

export default connect(null, { logout })(Logout);
