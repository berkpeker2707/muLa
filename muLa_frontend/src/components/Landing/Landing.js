import React, { Fragment, useEffect, useState } from "react";
import "../../App.css";
import { Link, Navigate } from "react-router-dom";

//component
import Footer from "./Footer/Footer.js"

//images
import muLaIcon from "../images/Icons/muLaMainIconImages/muLa-icon-blue(ChatBubbleToo).png";
import mobilePhone from "../images/LandingImages/mobilePhone.png";
import coupleVector from "../images/LandingImages/coupleVector.png";

// import landingImage1 from "../../../public/images/LandingImages/landingImage1.jpg";
// import landingImage2 from "../../../public/images/LandingImages/landingImage2.jpg";

//material
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import { getUsers } from "../../state/slices/usersSlices";

//redux
import store from "../../state/store";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

import { registerUser } from "../../state/slices/usersSlices";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Landing = () => {
  const { isAuthenticated } = useSelector((state) => state?.users);
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

  const classes = useStyles();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className={classes.root}>
      <Grid>
        {/* Landing Starts */}
        <Grid
          className="LandingSection1"
          container 
        >
          <Grid item xs={12} md={12}>
            <img className="muLaIcon" src={muLaIcon} />
          </Grid>

          <Grid container>
            <Grid item xs={6} md={5} style={{ margin: "auto" }}>
              <p className="muLaIntro">
                An app for finding people based on their Myers Briggs character
                types & aims for higher compatibility and suitable
                relationships.
              </p>
            </Grid>

            <Grid item xs={6} md={5} style={{ margin: "auto" }}>
              <img className="mobilePhone" src={mobilePhone} />
            </Grid>
          </Grid>
        </Grid>
        {/* Landing Ends */}

       <Footer />
      </Grid>
    </div>
  );
};

export default Landing;
