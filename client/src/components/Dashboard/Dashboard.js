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

//redux
import { useSelector, useDispatch } from "react-redux";
import { getUsersAction } from "../../state/slices/usersSlices";

const Dashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth?.userAuth);

  const users = useSelector((state) => state?.user);

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

  console.log(users);

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
                  <>
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
                          <IconButton aria-label="settings">test </IconButton>
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
                              <>
                                <FaBirthdayCake />
                                <br />
                                {users && users.age}
                              </>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaVenusMars />
                                <br />
                                {users && users.gender}
                              </>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaBriefcase />
                                <br />
                                {users && users.job}
                              </>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaLanguage />
                                <br />
                                {users && users.language}
                              </>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaPray />
                                <br />
                                {users && users.belief}
                              </>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaFlag />
                                <br />
                                {users && users.politics}
                              </>
                            </Grid>
                          </Grid>
                        </Typography>
                        <Typography paragraph>
                          <Grid container spacing={2}>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaUtensils />
                                <br />
                                {users && users.diet}
                              </>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaBeer />
                                <br />
                                {users && users.alcohol}
                              </>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaSmoking />
                                <br />
                                {users && users.smoking}
                              </>
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
                  </>
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
