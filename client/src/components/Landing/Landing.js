import React, { Fragment, useEffect, useState } from "react";
import "../../App.css";
import { Link, Navigate } from "react-router-dom";
import { FaRegHandPointRight } from "react-icons/fa";

import muLaIcon from "../images/Icons/muLaMainIconImages/muLa-icon.png";
// import muLaIcon from "../images/Icons/muLaMainIconImages/muLa-icon-blue(ChatBubbleToo).png";
import mobilePhone from "../images/LandingImages/mobilePhone.png";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { getUsers } from "../../state/slices/usersSlices";

//redux
import store from "../../state/store";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
// import { actionCreators } from "../../state/index";

import { registerUser } from "../../state/slices/usersSlices";

const Landing = () => {
  // const { isAuthenticated } = useSelector((state) => state?.users);

  // const user = useSelector((state) => state.auth.user);

  // const dispatch = useDispatch();

  // const {getUsers} = bindActionCreators(actionCreators, dispatch)
  // console.log(loadUser);
  // console.log(getUsers())

  // useEffect(() => {
  //   // dispatch(loadUser());
  //   dispatch(getUsers());
  // },[dispatch]);
  // const users = useSelector((state) => state.users.users);

  // console.log(users);

  // const {getUsers} = bindActionCreators(actionCreators, dispatch)
  // console.log(loadUser);
  // console.log(auth);

  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" />;
  // }
  return (
    <div>
      <Grid>
        <Grid className="LandingSection1" container>
          <Grid container>
            <Grid className="muLaIntroContainer" item xs={12} md={5}>
              <img className="muLaIcon" src={muLaIcon} />
              <p className="muLaIntro">
                An app for finding people based on their Myers Briggs character
                types & aims for higher compatibility and suitable
                relationships.
              </p>
              <Grid
                className="LandingButtonGroup"
                container
                item
                xs={12}
                md={12}
              >
                <Grid className="LandingButtonInner1" item xs={12} md={12}>
                  <Link to={"/login"}>
                    <Button
                      className="LandingLoginButton"
                      variant="text"
                      size="medium"
                      color="primary"
                    >
                      Already have an account?
                      <br />
                      Login
                    </Button>
                  </Link>
                  <Link to={"/register"}>
                    <Button
                      className="LandingRegisterButton"
                      variant="contained"
                      size="large"
                      color="primary"
                    >
                      <FaRegHandPointRight style={{ fontSize: "24px" }} />
                      Join muLa
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="mobilePhoneContainer" item xs={12} md={5}>
              <img className="mobilePhone" src={mobilePhone} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
