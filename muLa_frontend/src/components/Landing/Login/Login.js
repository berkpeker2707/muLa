// login(email, password);
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUserAction } from "../../../state/slices/authSlices";
import "../../../App.css";
import "../Register/logo2.png";
import Swal from "sweetalert2";
import Logo2 from "../Register/logo2.png";

import { set, useForm } from "react-hook-form";

const Login = () => {
  // const {users} = useSelector(state => state?.users);
  // console.log(store);

  const dispatch = useDispatch();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    showCloseButton: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

//   const { email, password } = formData;

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   const onSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(formData));
//   };

const onSubmit = (data) => {
    // console.log(data);
    dispatch(loginUserAction(data));
  };

  // useEffect(() => {
  //         if(error.status === 400){
  //             Toast.fire({
  //                 icon: 'warning',
  //                 title: "Wrong Email or Password"
  //             })
  //         }
  //     }, [error])

  // useEffect(() => {
  //     if(isAuthenticated){
  //     Toast.fire({
  //                 icon: 'success',
  //                 title: 'Signed in Successfully!'
  //             })
  //     }
  // }, [isAuthenticated])

  const store = useSelector((state) => state?.auth);
  const { userAuth, loading, serverErr, appErr} = store;
  // Redirect if authenticated
  if (userAuth) {
      return <Navigate to="/profile" />
  }

  return (
    <div className="login-component">
      <Link to="/" style={{ color: "rgb(217, 83, 79)" }}>
        {/* <img src={Logo2} alt="Logo2" /> */}
      </Link>

      <hr />
      <h1>Welcome Back!</h1>
      {/* <form onSubmit={(e) => onSubmit(e)}> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          {/* <label>
              Your Email
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Your email adress"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </label>
            <br /> */}

          <label>
            Your Email
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              placeholder="Your email adress"
              {...register("email", {
                required: {
                  value: true,
                  message: "*Please Enter Email",
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                },
              })}
            />
            {errors.email && (
              <p
                style={{
                  fontSize: "12px",
                  color: "yellow",
                  textAlign: "start",
                }}
              >
                {errors.email.message}
              </p>
            )}
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
              //value={values.password}
              //onChange={onChange("password")} required
              {...register("password", {
                required: { value: true, message: "*Please Enter Password" },
              })}
            />
            {errors.password && (
              <p
                style={{
                  fontSize: "12px",
                  color: "yellow",
                  textAlign: "start",
                }}
              >
                {errors.password.message}
              </p>
            )}
          </label>

          {/* <label>
              Your Password
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => onChange(e)}
                required
              />
            </label> */}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <br />
      <Link to="/forgot-password" style={{ color: "white" }}>
        Forgot Password
        <br />
      </Link>

      <hr />
      <Link to="/Register" style={{ color: "white" }}>
        Don't have account? <br />
        Click to Sign In!
      </Link>
    </div>
  );
};

export default Login;
