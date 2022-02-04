import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { loginUser } from "../../../state/slices/authSlice";
import { clearErrors } from "../../../state/actions/errorActions";
import "../../../App.css";
import "../Register/logo2.png"
import Swal from 'sweetalert2';
import Logo2 from "../Register/logo2.png";

const Login = (
    // {login, isAuthenticated, error, clearErrors }
) => {
    const dispatch = useDispatch();

    const [errorState, setErrorState]= useState([]);

    useEffect(() => {
        setErrorState(error)
    }, [isAuthenticated])
    // console.log(error.msg.errors)
    // console.log(error.msg.errors[0])
    // console.log(error.msg.errors[0].msg)


      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        showCloseButton: true
      })

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        dispatch(loginUser(email, password))
        // login(email, password);
    }
    useEffect(() => {
            if(error.status === 400){
                Toast.fire({
                    icon: 'warning',
                    title: "Wrong Email or Password"
                })
            }
        }, [error])
        
    useEffect(() => {
        if(isAuthenticated){
        Toast.fire({
                    icon: 'success',
                    title: 'Signed in Successfully!'
                })
        }
    }, [isAuthenticated])
    

    //Redirect if authenticated
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="login-component">        
            <Link to="/" style={{ color: "rgb(217, 83, 79)" }}>
                <img src={Logo2} alt="Logo2" />
            </Link>   

            <hr />
            <h1>
                Welcome Back!
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
                    </label>
                    <br />
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
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

            <br />
            <Link to="/forgot-password" style={{ color: "white" }}>
                Forgot Password<br />
            </Link>

            <hr />
            <Link to="/Register" style={{ color: "white" }}>
                Don't have account? <br />
                Click to Sign In!
            </Link>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error

})

Login.propTypes = {
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

export default connect(mapStateToProps, { login, clearErrors })(Login);
