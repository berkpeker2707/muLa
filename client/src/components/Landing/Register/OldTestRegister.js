/*import React, { useState } from "react";
import "../Register/register.css";
import "../Login/login.css";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../../actions/authActions";
import Logo2 from "./logo2.png";

const Register = ({ register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        job: "",
        description: ""
    });

    const { email,
        password,
        firstname,
        lastname,
        age,
        gender,
        job,
        description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        register({
            email,
            password,
            firstname,
            lastname,
            age,
            gender,
            job,
            description
        });
    }

    //Redirect if authenticated
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="register-component">
            <h1 style={{ fontSize: "40px" }}>
                Register <br />
                <Link to="/" style={{ color: "rgb(217, 83, 79)" }}>
                    <img src={Logo2} alt="Logo2" />
                </Link>

            </h1>
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
                    </label>{" "}
                    <label>
                        Your Password
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            value={password}
                            onChange={e => onChange(e)}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Your First Name
                        <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            name="firstname"
                            placeholder="Firstname"
                            value={firstname}
                            onChange={e => onChange(e)}
                            required
                        />
                    </label>{" "}
                    <label>
                        Your Lastname
                        <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            name="lastname"
                            placeholder="Lastname"
                            value={lastname}
                            onChange={e => onChange(e)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Your Age
                        <input
                            type="number"
                            min="18"
                            max="122"
                            className="form-control"
                            id="age"
                            name="age"
                            placeholder="Age"
                            value={age}
                            onChange={e => onChange(e)}
                            required
                        />
                    </label>{" "}
                    <label>
                        Your Gender
                        <select
                            className="form-control"
                            type="radio"
                            id="gender"
                            name="gender"
                            value={gender}
                            onChange={e => onChange(e)}
                            required
                        >
                            <option>Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Others</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        What's your craft?
                        <input
                            type="text"
                            className="form-control"
                            id="job"
                            name="job"
                            placeholder="Your Job"
                            value={job}
                            onChange={e => onChange(e)}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Give us anything fun about you!
                        <textarea
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="Write Something Fun About Yourself"
                            value={description}
                            onChange={e => onChange(e)}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
            <br />
            <Link to="/login" style={{ color: "white" }}>
                Already have account? <br />Click to Login!
            </Link>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

export default connect(mapStateToProps, { register })(Register);
*/