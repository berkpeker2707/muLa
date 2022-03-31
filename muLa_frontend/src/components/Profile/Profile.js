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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

//redux
import { useSelector } from "react-redux";

import ProfileActions from "./ProfileActions";
import ReTakeTestAction from "./ReTakeTest/ReTakeTestAction";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#ff6e40",
  backgroundColor: "#f5f0e1",
}));

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#1e3d59",
    },
    secondary: {
      main: "#ffc13b",
    },
    background: {
      default: "#1e3d59",
      paper: "#f5f0e1",
    },
    text: {
      primary: "#ff6e40",
      disabled: "#e16e40",
      secondary: "#ff6e40",
      hint: "#e16e40",
    },
  },
  typography: {
    body1: {
      fontWeight: 600,
      letterSpacing: "0.1em",
    },
    body2: {
      fontWeight: 600,
    },
  },
});

const Profile = () => {
  const user = useSelector((state) => state?.auth?.userAuth);

  return (
    <Fragment>
      {!user ? (
        <LoadingGif />
      ) : (
        <Fragment>
          <Container fluid>
            <ThemeProvider theme={theme} key={user._id}>
              <div className="main-body">
                <div className="row gutters-sm">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                          {user.profilePhoto ? (
                            <CardMedia
                              component="img"
                              src={`/me/avatar/${user.profilePhoto}`}
                              className="picture profilePhoto"
                              draggable="false"
                            />
                          ) : (
                            <CardMedia
                              component="img"
                              src={defaultProfilePicture}
                              className="picture profilePhoto"
                              draggable="false"
                            />
                          )}
                          <div className="mt-3">
                            <h4>
                              {user.firstname} {user.lastname}
                            </h4>
                            <hr />
                            <p className="font-size-sm">Current Location</p>
                            <button className="btn btn-outline-primary">
                              Like
                            </button>{" "}
                            <button className="btn btn-outline-primary">
                              Message
                            </button>
                            <hr />
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-12">
                              <FaVenusMars />
                            </div>
                            <div className="col-sm-12">{user.gender}</div>
                          </div>
                          <hr />
                          <div className="row">
                            <div
                              className="col-sm-12"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Tooltip on top"
                            >
                              <FaBirthdayCake />
                            </div>
                            <div className="col-sm-12">{user.age}</div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-12">
                              <FaLanguage />
                            </div>
                            <div className="col-sm-12">{user.language}</div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-12">
                              <FaBriefcase />
                            </div>
                            <div className="col-sm-12">{user.job}</div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-12">
                              <FaPrayingHands />
                            </div>
                            <div className="col-sm-12">{user.belief}</div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-12">
                              <FaPersonBooth />
                            </div>
                            <div className="col-sm-12">{user.politics}</div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-12">
                              <FaUtensils />
                            </div>
                            <div className="col-sm-12">{user.diet}</div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-12">
                              <FaBeer />
                            </div>
                            <div className="col-sm-12">{user.alcohol}</div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-12">
                              <FaSmoking />
                            </div>
                            <div className="col-sm-12">{user.smoking}</div>
                          </div>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row gutters-sm">
                      <div className="col-sm-12 mb-3">
                        <div className="card h-100">
                          <div className="card-body">
                            <h6 className="d-flex align-items-center mb-3">
                              <i className="material-icons text-info mr-2">
                                Character Type:
                              </i>
                              {user.characterType}
                            </h6>
                            <small>Extraversion - Introversion</small>
                            <div
                              className="progress mb-3"
                              style={{ height: "15px", background: "#dc3545" }}
                            >
                              <div
                                className="progress-bar progress-bar-striped bg-success"
                                role="progressbar"
                                style={{ width: `${user.extraversionValue}%` }}
                                aria-valuenow={user.extraversionValue}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {user.extraversionValue}%
                              </div>
                              <div
                                className="progress-bar progress-bar-striped bg-danger"
                                role="progressbar"
                                style={{ width: `${user.introversionValue}%` }}
                                aria-valuenow={user.introversionValue}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {user.introversionValue}%
                              </div>
                            </div>
                            <small>Sensing - Intuition</small>
                            <div
                              className="progress mb-3"
                              style={{ height: "15px", background: "#dc3545" }}
                            >
                              <div
                                className="progress-bar progress-bar-striped bg-success"
                                role="progressbar"
                                style={{ width: `${user.sensingValue}%` }}
                                aria-valuenow={user.sensingValue}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {user.sensingValue}%
                              </div>
                              <div
                                className="progress-bar progress-bar-striped bg-danger"
                                role="progressbar"
                                style={{ width: `${user.intuitionValue}%` }}
                                aria-valuenow={user.intuitionValue}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {user.intuitionValue}%
                              </div>
                            </div>
                            <small>Thinking - Feeling</small>
                            <div
                              className="progress mb-3"
                              style={{ height: "15px", background: "#dc3545" }}
                            >
                              <div
                                className="progress-bar progress-bar-striped bg-success"
                                role="progressbar"
                                style={{ width: `${user.thinkingValue}%` }}
                                aria-valuenow={user.thinkingValue}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {user.thinkingValue}%
                              </div>
                              <div
                                className="progress-bar progress-bar-striped bg-danger"
                                role="progressbar"
                                style={{ width: `${user.feelingValue}%` }}
                                aria-valuenow={user.feelingValue}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {user.feelingValue}%
                              </div>
                            </div>
                            <small>Judging - Perceiving</small>
                            <div
                              className="progress mb-3"
                              style={{ height: "15px", background: "#dc3545" }}
                            >
                              <div
                                className="progress-bar progress-bar-striped bg-success"
                                role="progressbar"
                                style={{ width: `${user.judgingValue}%` }}
                                aria-valuenow={user.judgingValue}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {user.judgingValue}%
                              </div>
                              <div
                                className="progress-bar progress-bar-striped bg-danger"
                                role="progressbar"
                                style={{ width: `${user.perceivingValue}%` }}
                                aria-valuenow={user.perceivingValue}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {user.perceivingValue}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row gutters-sm">
                      <div className="col-sm-12 mb-3">
                        <div className="card h-100">
                          <div className="card-body">
                            <h6 className="d-flex align-items-center mb-3">
                              <i className="material-icons text-info mr-2">
                                Description:
                              </i>
                            </h6>
                            <p>{user.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ProfileActions /> <ReTakeTestAction />
              </div>
            </ThemeProvider>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
