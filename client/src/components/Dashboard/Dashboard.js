import React, { Fragment, useEffect, useState } from "react";
import "../../App.css";
import defaultProfilePicture from "../../../src/defaultProfilePicture.png";
import LoadingGif from "./LoadingGif";
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getUsersAction } from "../../state/slices/authSlices";

const Dashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth?.userAuth);

  const users = useSelector((state) => state?.auth?.users);

  useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch]);

  const [currentIndexNumber, setCurrentIndexNumber] = useState(0);
  const [unlikedUserState, setUnlikedUserState] = useState(null);

  useEffect(() => {
    if (
      currentIndexNumber === undefined ||
      currentIndexNumber >= users?.length
    ) {
      setCurrentIndexNumber(0);
    }
  }, [currentIndexNumber]);

  // var showFilteredUsers = getFilteredUsers(users);

  console.log(users);

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

  // function getFilteredUsers(filterByThis) {
  //   return filterByThis.filter((filteredObj, index) => {
  //     // return index < 1 && filteredObj.age > 27;
  //     // return filteredObj.gender !== user?.gender && !(filteredObj.likedBy.includes(user?._id));
  //     return filteredObj.gender !== user?.gender && !user?.liked.includes(filteredObj._id);
  //   });
  // }

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

  return (
    <Fragment>
      {!users ? (
        <LoadingGif />
      ) : (
        <Fragment>
          {users.length > 0 ? (
            users
              ?.slice(currentIndexNumber, currentIndexNumber + 1)
              .map((users, i) => (
                <Container fluid>
                  <ThemeProvider theme={theme} key={users._id}>
                    <Card sx={{ maxWidth: 400, boxShadow: 10, mx: "auto" }}>
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ width: 50, height: 50 }}
                            variant="rounded"
                            aria-label="recipe"
                          >
                            {users && users.characterType}
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={users && users.firstname + " " + users.lastname}
                        subheader={users && "Age: " + users.age}
                      />
                      {users.profilePhoto ? (
                        <CardMedia
                          component="img"
                          className="picture userProfilePhoto"
                          src={users.profilePhoto}
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          className="picture userProfilePhoto"
                          src={defaultProfilePicture}
                        />
                      )}

                      {console.log(users.profilePhoto)}
                      <CardContent>
                        {users && users.description ? (
                          <Typography variant="body1">
                            {users && users.description}
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
                                {users && users.age}
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaVenusMars />
                                <br />
                                {users && users.gender}
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaBriefcase />
                                <br />
                                {users && users.job}
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaLanguage />
                                <br />
                                {users && users.language}
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaPray />
                                <br />
                                {users && users.belief}
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaFlag />
                                <br />
                                {users && users.politics}
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
                                {users && users.diet}
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaBeer />
                                <br />
                                {users && users.alcohol}
                              </Item>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <Item>
                                <FaSmoking />
                                <br />
                                {users && users.smoking}
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
                          variant="outlined"
                          color="success"
                          aria-label="add to favorites"
                          // className="letstalkbutton"
                          // onClick={() => {
                          //   likeUser(users?._id);
                          //   setCurrentIndexNumber(currentIndexNumber + 1);
                          // }}
                          sx={{ mx: "auto" }}
                        >
                          <FavoriteIcon />
                          Like
                        </Button>
                        <Button
                          variant="outlined"
                          aria-label="add to meh"
                          // className="mehbutton"
                          onClick={() => {
                            setUnlikedUserState(users?._id);
                            // unlikeUser(users?._id);
                            setCurrentIndexNumber(currentIndexNumber + 1);
                          }}
                          sx={{ mx: "auto" }}
                        >
                          ICON HERE - Later
                        </Button>
                      </CardActions>
                    </Card>
                  </ThemeProvider>
                </Container>
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
      )}
    </Fragment>
  );
};

// Old test button for checking liked users
{
  /* <Button
  className="mehbutton"
  variant="primary"
  onClick={() => {
    getLiked();
    setCurrentIndexNumber(currentIndexNumber + 1);
  }}
>
  <h6> Get Liked Users (Test Button)</h6>
</Button>; */
}

export default Dashboard;
