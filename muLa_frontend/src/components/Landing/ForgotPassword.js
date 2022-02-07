import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import "../../App.css";
import { forgotPasswordActions } from "../../state/actions/forgotPasswordActions";

const ForgotPassword = ({ isAuthenticated, forgotPasswordActions }) => {

    const [formData, setFormData] = useState({
        email: "",
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        forgotPasswordActions(formData);
    }

    //Redirect if authenticated
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <div className="login-component">
            <h1>
                Forgot Password?
            </h1>
            <br />
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label>
                        Your Email
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Your email adress"
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </label>
                    <hr />
                    <Link to="/login" style={{ color: "white" }}>
                        Already have account?
                        Click to Login!<br />
                    </Link>

                    <hr />
                    <Link to="/Register" style={{ color: "white" }}>
                        Don't have account? <br />
                        Click to Sign In!
                    </Link>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    forgotPasswordActions: PropTypes.func.isRequired
})

ForgotPassword.propTypes = {
    isAuthenticated: PropTypes.bool,
}

export default connect(mapStateToProps, { forgotPasswordActions })(ForgotPassword);
