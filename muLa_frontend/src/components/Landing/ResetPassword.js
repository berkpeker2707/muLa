import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate, useParams } from "react-router-dom";
import "../../App.css";
import { resetPasswordActions } from "../../state/actions/resetPasswordActions";

const ResetPassword = ({ isAuthenticated, resetPasswordActions }) => {

    const params = useParams();
    const paramToken = params[0];

    const [formData, setFormData] = useState({
        resetLink: paramToken,
        newPass: ""
    });

    const { resetLink, newPass } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        resetPasswordActions({ resetLink, newPass });
    }

    //Redirect if authenticated
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <div className="login-component">
            <h1>
                Reset Password
            </h1>
            <br />
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" name="resetLink" id="resetLink" value={resetLink}
                        onChange={e => onChange(e)} />
                    <br />
                    <label>
                        Your New Password
                        <input
                            type="password"
                            className="form-control"
                            id="newPass"
                            name="newPass"
                            placeholder="Your new password"
                            value={newPass}
                            onChange={e => onChange(e)}
                            required
                        />
                    </label>
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
    resetPasswordActions: PropTypes.func.isRequired
})

ResetPassword.propTypes = {
    isAuthenticated: PropTypes.bool,
}

export default connect(mapStateToProps, { resetPasswordActions })(ResetPassword);
