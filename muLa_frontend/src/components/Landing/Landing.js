import React from "react";
import "../../App.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import landingImage1 from "./landingImage1.jpg";
import landingImage2 from "./landingImage2.jpg";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

//redux
import store from "../../state/store";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Landing = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  // const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const {getUsers} = bindActionCreators(actionCreators, dispatch)
  // console.log(loadUser);
  // console.log(auth);

  const classes = useStyles();

  
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="LandingComponent">
      <div className={classes.root}>
        <Grid container spacing={3} className="LandingSection1">
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3} className="LandingSection1">
          <Grid item xs={3}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}> <h5>What do we offer?</h5>
            <p>
              Friendship app focuses constructive ways to find and build
              compatible relationship.
              <br />
              By using well-known Myers-Briggs Testing, we want our users to
              feel satisfied and feel{" "}
            </p></Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
            <h4>Why muLa?</h4>
            <p>
              We all desire that unreachable tasty red apple, yet in reality, it
              is not the case. Relationships seek compatible souls, and deeper
              understanding. Deep down we all want something familiar, someone
              who can understand our core. Here MuLa kicks in, we find people
              who are familiar for you to have stable and constructive
              relationship.
            </p>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3} className="LandingSection1">
        <Grid item xs={3}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}> <h5>What do we offer?</h5>
            <p>
              Friendship app focuses constructive ways to find and build
              compatible relationship.
              <br />
              By using well-known Myers-Briggs Testing, we want our users to
              feel satisfied and feel{" "}
            </p></Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
            <h4>Why muLa?</h4>
            <p>
              We all desire that unreachable tasty red apple, yet in reality, it
              is not the case. Relationships seek compatible souls, and deeper
              understanding. Deep down we all want something familiar, someone
              who can understand our core. Here MuLa kicks in, we find people
              who are familiar for you to have stable and constructive
              relationship.
            </p>
            </Paper>
          </Grid>
        </Grid>
      </div>

      <Container fluid="xxl">
        {/* <Row className="LandingSection1"> */}
          {/* <Col className="landingP">
            <h5>What do we offer?</h5>
            <p>
              Friendship app focuses constructive ways to find and build
              compatible relationship.
              <br />
              By using well-known Myers-Briggs Testing, we want our users to
              feel satisfied and feel{" "}
            </p>
          </Col> */}
          {/* <Col className="landingImage1" src={landingImage1}></Col>
        </Row> */}

        <Row>
          <Col></Col>
        </Row>

        <Row className="LandingSection2">
          <Col>
            <h4>Already signed up?</h4>
          </Col>
          <Col>
            <Link to="/register">Register</Link>
          </Col>
          <Col>
            <Link to="/login">Login</Link>
          </Col>
        </Row>

        {/* <Row
          className="LandingSection2"
          style={{ paddingLeft: "15px", paddingRight: "15px" }}
          md={4}
        >
          <Col md={5}>
            <h4>Why muLa?</h4>
          </Col>
          <Col xs={7}>
            <p>
              We all desire that unreachable tasty red apple, yet in reality, it
              is not the case. Relationships seek compatible souls, and deeper
              understanding. Deep down we all want something familiar, someone
              who can understand our core. Here MuLa kicks in, we find people
              who are familiar for you to have stable and constructive
              relationship.
            </p>
          </Col>
        </Row> */}
        <br />
        <Row className="LandingSection2">
          <Col md={5}>
            <h4>How Does It Work?</h4>
          </Col>
          <Col xs={7}>
            <p>
              MuLa uses MBTI character types & encourages you to complete your
              character type test. Once your character classification is done,
              we encourage you to find people whom you can form deep bonds &
              interested in talk to.
            </p>
          </Col>
        </Row>
        <br />
        <Row className="LandingSection2">
          <Col md={5}>
            <h4>What We Don't Do?</h4>
          </Col>
          <Col xs={7}>
            <p>
              In this fast consumerist age, we highly discourage shallow
              relationships. Instead, we want you to discover each other and
              form friendships & deep bonds.
            </p>
          </Col>
        </Row>
        <br />
        {/* <Row className="LandingSection3">
          <Col md="5">
            <h4>Another Section</h4>
          </Col>
          <Col xs={7}>
            <p>Another section information</p>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

// Landing.propTypes = {
//   isAuthenticated: PropTypes.bool,
// };

// export default connect(mapStateToProps, {})(Landing);
export default Landing;
