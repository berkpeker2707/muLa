// login(email, password);
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUserAction } from "../../../state/slices/authSlices";
import "../../../App.css";
import "../Register/logo2.png";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(loginUserAction(values));
    },
  });

  const store = useSelector((state) => state?.auth);
  const { auth, loading, serverErr, appErr } = store;
  // Redirect if authenticated
  if (auth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container maxWidth="sm" className="login-component">
      <Link to="/" style={{ color: "rgb(217, 83, 79)" }}>
        {/* <img src={Logo2} alt="Logo2" /> */}
      </Link>

      <hr />
      <h1>Welcome Back!</h1>
      {/* <form onSubmit={(e) => onSubmit(e)}> */}
      <form onSubmit={formik.handleSubmit}>
        <label>
          Your Email
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            placeholder="Your email adress"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
        </label>

        {formik.touched.email && formik.errors.email ? (
          <p style={{ color: "yellow" }}>{formik.errors.email}</p>
        ) : null}
        {formik.touched.password && formik.errors.password ? (
          <p style={{ color: "yellow" }}>{formik.errors.password}</p>
        ) : null}

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>

      <br />
      <Link to="/forgot-password" style={{ color: "white" }}>
        Forgot Password
        <br />
      </Link>

      <hr />
      <Link to="/Register" style={{ color: "white" }}>
        Don't have account? <br />
        Click to login!
      </Link>
    </Container>
  );
};

export default Login;
