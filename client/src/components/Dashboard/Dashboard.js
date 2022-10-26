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

  const user = useSelector((state) => state.auth.auth);
  const allUsers = useSelector((state) => state?.users.users);

  useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch]);

  const [currentIndexNumber, setCurrentIndexNumber] = useState(0);
  const [unlikedUserState, setUnlikedUserState] = useState(null);

  useEffect(() => {
    if (
      currentIndexNumber === undefined ||
      currentIndexNumber >= allUsers?.length
    ) {
      setCurrentIndexNumber(0);
    }
  }, [currentIndexNumber]);

  console.log(allUsers);

  return (
    <Fragment>
      {!allUsers ? (
        <LoadingGif />
      ) : (
        <Fragment>
          {allUsers.length > 0 ? (
            allUsers
              ?.slice(currentIndexNumber, currentIndexNumber + 1)
              .map((allUsers, i) => (
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
                            {allUsers && allUsers.characterType}
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">test </IconButton>
                        }
                        title={
                          allUsers &&
                          allUsers.firstname + " " + allUsers.lastname
                        }
                        subheader={allUsers && "Age: " + allUsers.age}
                      />
                      {allUsers.profilePhoto ? (
                        <CardMedia
                          component="img"
                          className="picture userProfilePhoto"
                          src={allUsers.profilePhoto}
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          className="picture userProfilePhoto"
                          src={defaultProfilePicture}
                        />
                      )}

                      {console.log(allUsers.profilePhoto)}
                      <CardContent>
                        {allUsers && allUsers.description ? (
                          <Typography variant="body1">
                            {allUsers && allUsers.description}
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
                                {allUsers && allUsers.age}
                              </>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaVenusMars />
                                <br />
                                {allUsers && allUsers.gender}
                              </>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaBriefcase />
                                <br />
                                {allUsers && allUsers.job}
                              </>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaLanguage />
                                <br />
                                {allUsers && allUsers.language}
                              </>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaPray />
                                <br />
                                {allUsers && allUsers.belief}
                              </>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaFlag />
                                <br />
                                {allUsers && allUsers.politics}
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
                                {allUsers && allUsers.diet}
                              </>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaBeer />
                                <br />
                                {allUsers && allUsers.alcohol}
                              </>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <>
                                <FaSmoking />
                                <br />
                                {allUsers && allUsers.smoking}
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
                          //   likeUser(allUsers?._id);
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
                            setUnlikedUserState(allUsers?._id);
                            // unlikeUser(allUsers?._id);
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

// Old test button for checking liked allUsers
{
  /* <Button
  className="mehbutton"
  variant="primary"
  onClick={() => {
    getLiked();
    setCurrentIndexNumber(currentIndexNumber + 1);
  }}
>
  <h6> Get Liked allUsers (Test Button)</h6>
</Button>; */
}

export default Dashboard;
