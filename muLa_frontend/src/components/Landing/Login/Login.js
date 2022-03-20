// login(email, password);
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../../../state/slices/authSlices";
import "../../../App.css";
import "../Register/logo2.png"
import Swal from 'sweetalert2';
import Logo2 from "../Register/logo2.png";

const Login = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const store = useSelector((state) => state?.users);
    const {isAuthenticated, users}= store;
    // const {users} = useSelector(state => state?.users);
    // console.log(store);

    const [errorState, setErrorState]= useState([]);

    // useEffect(() => {
    //     setErrorState(error)
    // }, [isAuthenticated])

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
        dispatch(loginUser(formData))
    }
    useNavigate("/dashboard");
    // useEffect(() => {
    //         if(error.status === 400){
    //             Toast.fire({
    //                 icon: 'warning',
    //                 title: "Wrong Email or Password"
    //             })
    //         }
    //     }, [error])
        
    useEffect(() => {
        if(isAuthenticated){
        Toast.fire({
                    icon: 'success',
                    title: 'Signed in Successfully!'
                })
        }
    }, [isAuthenticated])
    

    // Redirect if authenticated
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
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

export default Login;
