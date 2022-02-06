import React, { Fragment, useEffect, useState } from "react";
// import "../../App.css";
import defaultProfilePicture from "../Profile/defaultProfilePicture.png";
import {
  Row,
  Col,
  Container,
  Button,
  Card as CardB,
  Nav,
  Tab,
  Fade,
} from "react-bootstrap";
import {
  FaComments,
  FaMehBlank,
  FaBeer,
  FaSmoking,
  FaVenusMars,
  FaLanguage,
  FaPray,
  FaFlag,
  FaUtensils,
  FaBirthdayCake,
  FaBriefcase,
} from "react-icons/fa";
import LoadingGif from "./LoadingGif";

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

import { shadows } from '@mui/system';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { typography } from "@mui/system";

//redux
import store from "../../state/store";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import { getUsers } from "../../state/slices/usersSlices";

const Dashboard = () => {


  const user = useSelector((state) => state.users.user);
  const auth = useSelector((state) => state.users.isAuthenticated);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  // const {getUsers} = bindActionCreators(actionCreators, dispatch)
  // console.log(loadUser);
// console.log(getUsers())

  useEffect(() => {
    // dispatch(loadUser());
    dispatch(getUsers());
  }, [dispatch]);


  const [currentUser, setCurrentUser] = useState(null);
  const [currentDisplayedUser, setCurrentDisplayedUser] = useState(null);
  const [currentIndexNumber, setCurrentIndexNumber] = useState(0);
  const [unlikedUserState, setUnlikedUserState] = useState(null);


  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    if (currentDisplayedUser) {
      setCurrentDisplayedUser(showFilteredUsers[currentIndexNumber]);
    } else {
      setCurrentIndexNumber(0);
      setCurrentDisplayedUser(showFilteredUsers[currentIndexNumber]);
    }
  }, [users, currentDisplayedUser, currentIndexNumber]);

  // console.log(user);
  // console.log(users);
  // console.log(currentUser);
  console.log(currentDisplayedUser);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Distance Calculation Based on Lat & Lon
  // function distance(lat1, lat2, lon1, lon2) {
  //   // The math module contains a function
  //   // named toRadians which converts from
  //   // degrees to radians.
  //   lon1 = (lon1 * Math.PI) / 180;
  //   lon2 = (lon2 * Math.PI) / 180;
  //   lat1 = (lat1 * Math.PI) / 180;
  //   lat2 = (lat2 * Math.PI) / 180;

  //   // Haversine formula
  //   let dlon = lon2 - lon1;
  //   let dlat = lat2 - lat1;
  //   let a =
  //     Math.pow(Math.sin(dlat / 2), 2) +
  //     Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  //   let c = 2 * Math.asin(Math.sqrt(a));

  //   // Radius of earth in kilometers. Use 3956
  //   // for miles
  //   let r = 6371;

  //   // calculate the result
  //   return Math.round(c * r);
  // }
  // Driver code
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // let lat1 = 53.32055555555556;
  // let lon1 = -1.7297222222222221;

  // let lat2 = 53.31861111111111;
  // let lon2 = -1.6997222222222223;

  // console.log(
  //   distance(lat1, lat2, lon1, lon2) + " K.M"
  // );

  // distance(
  //   user.userLatitude,
  //   showFilteredUsers.userLatitude,
  //   user.userLongitude,
  //   showFilteredUsers.userLongitude
  // )

  function getFilteredUsers(filterByThis) {
    return filterByThis.filter((filteredObj, index) => {
      // return index < 1 && filteredObj.age > 27;
      // return filteredObj.gender !== currentUser?.gender && !(filteredObj.likedBy.includes(currentUser?._id));
      return filteredObj.gender !== currentUser?.gender && !currentUser?.liked.includes(filteredObj._id);
    });
  }
  var showFilteredUsers = getFilteredUsers(users);

  // function sortDist(di) {
  //   return di
  //   .filter((dij) => {
  //     return dij.age > 27;
  //   })
  // }

  // let filteredUsers = users.filter=(function (currentElement) {
  //   return currentElement.age >27 && currentElement.characterType === "ISFP";
  // })

  // console.log(filteredUsers);

  // const axios = require('axios');
  // const [axiosGetMe, setAxiosGetMe] = useState(null);
  // React.useEffect(() => {
  //   axios.get("/me").then((response) => {
  //     setAxiosGetMe(response.data);
  //   });
  // }, []);
  // console.log(axiosGetMe)

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#ff6e40",
    backgroundColor: '#f5f0e1'
  }));

  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#1e3d59',
      },
      secondary: {
        main: '#ffc13b',
      },
      background: {
        default: '#1e3d59',
        paper: '#f5f0e1',
      },
      text: {
        primary: '#ff6e40',
        disabled: '#e16e40',
        secondary: '#ff6e40',
        hint: '#e16e40',
      },
    },
    typography: {
      body1: {
        fontWeight: 600,
        letterSpacing: '0.1em',
      },
      body2: {
        fontWeight: 600,
      },
    },

  });
  
  return (
    <Fragment>
      {auth.isLoading === true ? (
        <LoadingGif />
      ) : (
        <Fragment>
          {auth.user ||
          currentDisplayedUser !== null ||
          currentDisplayedUser !== undefined ||
          currentDisplayedUser !== {} ||
          currentUser !== null ||
          currentUser !== undefined ||
          currentUser !== {}
          ? (
            <Fragment>
              {showFilteredUsers.length > 0 ? (
                showFilteredUsers.slice(0, 1).map((showFilteredUsers, i) => (
                  // <Container fluid key={showFilteredUsers._id}>
                  <ThemeProvider theme={theme} key={showFilteredUsers._id}>
                    <Card sx={{ maxWidth: 400, boxShadow: 10, mx: "auto" }}>
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ width: 50, height: 50 }}
                            variant="rounded"
                            aria-label="recipe"
                          >
                            {currentDisplayedUser &&
                              currentDisplayedUser.characterType}
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={
                          currentDisplayedUser &&
                          currentDisplayedUser.firstname +
                            " " +
                            currentDisplayedUser.lastname
                        }
                        subheader={
                          currentDisplayedUser &&
                          "Age: " + currentDisplayedUser.age
                        }
                      />
                      {currentDisplayedUser.picture ? (
                        <CardMedia
                          component="img"
                          className="picture userProfilePhoto"
                          src={`/me/avatar/${currentDisplayedUser.picture.filename}`}
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          className="picture userProfilePhoto"
                          src={defaultProfilePicture}
                        />
                      )}
                      <CardContent>
                        {currentDisplayedUser &&
                        currentDisplayedUser.description ? (
                          <Typography variant="body1">
                            {currentDisplayedUser &&
                              currentDisplayedUser.description}
                          </Typography>
                        ) : (
                          <Typography
                            variant="body2"
                            color="text.primary"
                          ></Typography>
                        )}
                      </CardContent>
                      <CardContent>
                        <hr />
                        <Typography paragraph>
                          <Grid container spacing={2}>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaBirthdayCake />
                                <br />
                                {currentDisplayedUser &&
                                  currentDisplayedUser.age}
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaVenusMars />
                                <br />
                                {currentDisplayedUser &&
                                  currentDisplayedUser.gender}
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaBriefcase />
                                <br />
                                {currentDisplayedUser &&
                                  currentDisplayedUser.job}
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaLanguage />
                                <br />
                                {currentDisplayedUser &&
                                  currentDisplayedUser.language}
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaPray />
                                <br />
                                {currentDisplayedUser &&
                                  currentDisplayedUser.belief}
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaFlag />
                                <br />
                                {currentDisplayedUser &&
                                  currentDisplayedUser.politics}
                              </Item>
                            </Grid>
                          </Grid>
                        </Typography>
                        <Typography paragraph>
                          <Grid container spacing={2}>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaUtensils />
                                <br />
                                {currentDisplayedUser &&
                                  currentDisplayedUser.diet}
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaBeer />
                                <br />
                                {currentDisplayedUser &&
                                  currentDisplayedUser.alcohol}
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaSmoking />
                                <br />
                                {currentDisplayedUser &&
                                  currentDisplayedUser.smoking}
                              </Item>
                            </Grid>
                          </Grid>
                        </Typography>
                      </CardContent>
                      <hr />
                      <CardActions
                        sx={{ mx: "auto", justifyContent: "center" }}
                      >
                        <Button
                          color="success"
                          aria-label="add to favorites"
                          // className="letstalkbutton"
                          // onClick={() => {
                          //   likeUser(currentDisplayedUser?._id);
                          //   setCurrentIndexNumber(currentIndexNumber + 1);
                          // }}
                          sx={{ mx: "auto" }}
                        >
                          <FavoriteIcon />
                          Like
                        </Button>
                        <Button
                          aria-label="add to meh"
                          // className="mehbutton"
                          onClick={() => {
                            setUnlikedUserState(currentDisplayedUser?._id);
                            // unlikeUser(currentDisplayedUser?._id);
                            setCurrentIndexNumber(currentIndexNumber + 1);
                          }}
                          sx={{ mx: "auto" }}
                        >
                          <SentimentDissatisfiedIcon />
                          Later
                        </Button>
                      </CardActions>
                    </Card>
                  </ThemeProvider>
                  // </Container>
                ))
              ) : (
                <Fragment>
                  <h4>Oops... it seems you've run out of potential matches.</h4>
                  <h4>
                    Please try checking again later or change your preferences.
                  </h4>
                </Fragment>
              )}
            </Fragment>
          ) : (
            <h4>Couldn't Retrieve Your Account</h4>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

// Old test button for checking liked users
{/* <Button
  className="mehbutton"
  variant="primary"
  onClick={() => {
    getLiked();
    setCurrentIndexNumber(currentIndexNumber + 1);
  }}
>
  <h6> Get Liked Users (Test Button)</h6>
</Button>; */}

export default Dashboard;
