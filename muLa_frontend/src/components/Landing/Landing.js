import React, { Fragment, useEffect, useState } from "react";
import "../../App.css";
import { Link, Navigate } from "react-router-dom";

//images
import muLaIcon from "../images/Icons/muLaMainIconImages/muLa-icon-TextWithShadow-white.png";
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
  }
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
      <Grid
        container
        maxWidth="sm"
        // m={2}
        // pt={3}
        // style={{
        //   backgroundImage: `url(${coupleVector})`,
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        //   paddingLeft: "0",
        //   paddingRight: "0",
        // }}
      >
        {/* <div
            className="blurImage"
            style={{
              // background: 'rgba(255, 255, 255, 0.1)',// Make sure this color has an opacity of less than 1
              backdropFilter: "blur(4px)", // This be the blur
            }}
          > */}
        <Grid
          className="LandingSection1"
          container
          spacing={0.5}
          style={{
            direction: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} md={6}>
            <img className="muLaIcon" src={muLaIcon} />
            <p className="muLaIntro">
              An app for finding people based on their Myers Briggs character
              types & aims for higher compatibility and suitable relationships.
            </p>
          </Grid>
          <Grid item xs={12} md={3}>
            <img className="mobilePhone" src={mobilePhone} />
          </Grid>
        </Grid>

        {/* THERE THE PARTITION STARTS */}
        {/* THERE THE PARTITION STARTS */}
        {/* THERE THE PARTITION STARTS */}
        {/* THERE THE PARTITION STARTS */}
        {/* THERE THE PARTITION STARTS */}
        <Grid
          className="Footer"
          px={{ xs: 3, sm: 10 }}
          py={{ xs: 5, sm: 10 }}
          container
          spacing={0.5}
            style={{
              direction: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
        >
          <Grid container item xs={12} sm={12}>
            <Grid item xs={12} sm={4}>
              <Grid item borderBottom={1}>
                Help
              </Grid>
              <Grid item>
                <Link to="/" color="inherit">
                  Contact
                </Link>
              </Grid>
              <Grid item>
                <Link to="/" color="inherit">
                  Support
                </Link>
              </Grid>
              <Grid item>
                <Link to="/" color="inherit">
                  Privacy
                </Link>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Grid borderBottom={1}>Account</Grid>
              <Grid>
                <Link to="/" color="inherit">
                  Login
                </Link>
              </Grid>
              <Grid>
                <Link to="/" color="inherit">
                  Register
                </Link>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Grid borderBottom={1}>About</Grid>
              <Grid>
                <Link to="/" color="inherit">
                  F.A.Q.
                </Link>
              </Grid>
              <Grid>
                <Link to="/" color="inherit">
                  History
                </Link>
              </Grid>
              <Grid>
                <Link to="/" color="inherit">
                  Roll
                </Link>
              </Grid>
            </Grid>
          </Grid>

          <Grid textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            muLa &reg; {new Date().getFullYear()}
          </Grid>
        </Grid>

        {/* THERE THE PARTITION ENDS */}
        {/* THERE THE PARTITION ENDS */}
        {/* THERE THE PARTITION ENDS */}
        {/* THERE THE PARTITION ENDS */}
        {/* THERE THE PARTITION ENDS */}
      </Grid>
    </div>
  );
};

export default Landing;
