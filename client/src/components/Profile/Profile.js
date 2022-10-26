import React, { Fragment } from "react";
import "../../App.css";
import defaultProfilePicture from "../../../src/defaultProfilePicture.png";
import LoadingGif from "../Dashboard/LoadingGif";
import {
  FaComments,
  FaMehBlank,
  FaBeer,
  FaSmoking,
  FaVenusMars,
  FaLanguage,
  FaPray,
  FaPrayingHands,
  FaFlag,
  FaUtensils,
  FaBirthdayCake,
  FaBriefcase,
  FaPersonBooth,
  FaLocationArrow,
} from "react-icons/fa";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

//redux
import { useSelector } from "react-redux";

import ProfileActions from "./ProfileActions";
import ReTakeTestAction from "./ReTakeTest/ReTakeTestAction";

function checkCharacterType(characterType) {
  if (characterType === "NT") {
    console.log("NT");
  } else if (characterType === "NF") {
    console.log("NF");
  } else if (characterType === "SJ") {
    console.log("SJ");
  } else if (characterType === "SP") {
    console.log("SP");
  } else {
    console.log("WAIT.. WHA?");
  }
}

const Profile = () => {
  const user = useSelector((state) => state?.auth?.auth);

  ////////////////
  // CHECK HERE //
  console.log(user && user.characterType);
  var varCharacter = user && user.characterType;
  const substring = "NF";
  console.log(varCharacter.includes(substring)); // true
  checkCharacterType(substring);
  ////////////////

  return (
    <Fragment>
      {!user ? (
        <LoadingGif />
      ) : (
        <Fragment>
          <Container fluid>
            {user && user.characterType === "INFP" ? (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <Card style={{ textAlign: "center" }}>
                      <CardContent>
                        {/* <div className="d-flex flex-column align-items-center text-center"> */}
                        {user && user.profilePhoto ? (
                          <CardMedia
                            component="img"
                            src={`/me/avatar/${user && user.profilePhoto}`}
                            className="picture profilePhoto"
                            style={{ margin: "auto" }}
                            draggable="false"
                          />
                        ) : (
                          <CardMedia
                            component="img"
                            src={defaultProfilePicture}
                            className="picture profilePhoto"
                            style={{ margin: "auto" }}
                            draggable="false"
                          />
                        )}

                        <CardContent>
                          <Typography variant="h4">
                            {user && user.firstname} {user && user.lastname}
                          </Typography>
                          <hr />
                          <Typography>
                            <FaLocationArrow />
                            <br />
                            "Location"
                          </Typography>
                        </CardContent>
                        <hr />
                        <Grid item xs={12} md={12}>
                          <FaVenusMars />
                          <br />
                          {user && user.gender}
                        </Grid>
                        <hr />
                        <Grid item xs={12} md={12}>
                          <FaBirthdayCake />
                          <br />
                          {user && user.age}
                        </Grid>
                        <hr />
                        <Grid item xs={12} md={12}>
                          <FaLanguage />
                          <br />
                          {user && user.language}
                        </Grid>
                        <hr />
                        <Grid item xs={12} md={12}>
                          <FaBriefcase />
                          <br />
                          {user && user.job}
                        </Grid>
                        <hr />
                        <Grid item xs={12} md={12}>
                          <FaPrayingHands />
                          <br />
                          {user && user.belief}
                        </Grid>
                        <hr />
                        <Grid item xs={12} md={12}>
                          <FaPersonBooth />
                          <br />
                          {user && user.politics}
                        </Grid>
                        <hr />
                        <Grid item xs={12} md={12}>
                          <FaUtensils />
                          <br />
                          {user && user.diet}
                        </Grid>
                        <hr />
                        <Grid item xs={12} md={12}>
                          <FaBeer />
                          <br />
                          {user && user.alcohol}
                        </Grid>
                        <hr />
                        <Grid item xs={12} md={12}>
                          <FaSmoking />
                          <br />
                          {user && user.smoking}
                        </Grid>
                        <hr />
                        {/* </div> */}
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <Grid container>
                      <Grid item xs={12} md={12}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6">
                              Character Type:
                            </Typography>
                            <Typography className="material-icons text-info mr-2">
                              {user && user.characterType}
                            </Typography>
                            <small>Extraversion - Introversion</small>
                            <Grid className="linearProgressContainer" container>
                              <LinearProgress
                                className="linearProgressBar"
                                variant="determinate"
                                value={100}
                                color="tertiary"
                                style={{
                                  height: "15px",
                                  borderRadius: "5px 0px 0px 5px",
                                  width: `${user && user.extraversionValue}%`,
                                  backgroundColor: "yellow",
                                }}
                              />
                              <LinearProgress
                                className="linearProgressBar"
                                variant="determinate"
                                value={100}
                                color="quaternary"
                                style={{
                                  height: "15px",
                                  borderRadius: "0px 5px 5px 0px",
                                  width: `${user && user.introversionValue}%`,
                                  backgroundColor: "red",
                                }}
                              />
                            </Grid>
                            <small>Sensing - Intuition</small>
                            <Grid className="linearProgressContainer" container>
                              <LinearProgress
                                className="linearProgressBar"
                                variant="determinate"
                                value={100}
                                color="tertiary"
                                style={{
                                  height: "15px",
                                  borderRadius: "5px 0px 0px 5px",
                                  width: `${user && user.sensingValue}%`,
                                  backgroundColor: "yellow",
                                }}
                              />
                              <LinearProgress
                                className="linearProgressBar"
                                variant="determinate"
                                value={100}
                                color="quaternary"
                                style={{
                                  height: "15px",
                                  borderRadius: "0px 5px 5px 0px",
                                  width: `${user && user.intuitionValue}%`,
                                  backgroundColor: "red",
                                }}
                              />
                            </Grid>
                            <small>Thinking - Feeling</small>
                            <Grid className="linearProgressContainer" container>
                              <LinearProgress
                                className="linearProgressBar"
                                variant="determinate"
                                value={100}
                                color="tertiary"
                                style={{
                                  height: "15px",
                                  borderRadius: "5px 0px 0px 5px",
                                  width: `${user && user.thinkingValue}%`,
                                  backgroundColor: "yellow",
                                }}
                              />
                              <LinearProgress
                                className="linearProgressBar"
                                variant="determinate"
                                value={100}
                                color="quaternary"
                                style={{
                                  height: "15px",
                                  borderRadius: "0px 5px 5px 0px",
                                  width: `${user && user.feelingValue}%`,
                                  backgroundColor: "red",
                                }}
                              />
                            </Grid>
                            <small>Judging - Perceiving</small>
                            <Grid className="linearProgressContainer" container>
                              <LinearProgress
                                className="linearProgressBar"
                                variant="determinate"
                                value={100}
                                color="tertiary"
                                style={{
                                  height: "15px",
                                  borderRadius: "5px 0px 0px 5px",
                                  width: `${user && user.judgingValue}%`,
                                  backgroundColor: "yellow",
                                }}
                              />
                              <LinearProgress
                                className="linearProgressBar"
                                variant="determinate"
                                value={100}
                                color="quaternary"
                                style={{
                                  height: "15px",
                                  borderRadius: "0px 5px 5px 0px",
                                  width: `${user && user.perceivingValue}%`,
                                  backgroundColor: "red",
                                }}
                              />
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} md={12}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" aria-label="italic">
                              Description:
                            </Typography>
                            <Typography>{user && user.description}</Typography>
                          </CardContent>
                        </Card>
                        <ProfileActions /> <ReTakeTestAction />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
