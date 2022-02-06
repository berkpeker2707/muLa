import React, { Fragment, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer.js";
import FAQ from "./components/Footer/FAQ.js";
import Landing from "./components/Landing/Landing.js";
import Register from "./components/Landing/Register/Register.js";
import ConfirmPage from "./components/Landing/Register/ConfirmPage.js";
import Login from "./components/Landing/Login/Login.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Header from "./components/Header/Header.js";
import ChatRoom from "./components/Chat/ChatRoom.js";
import ForgotPassword from "./components/Landing/ForgotPassword";
import PrivateRoute from "./components/Routing/PrivateRoute";

//redux
// import store from "./state/store";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";

import { loadUser } from "./state/actions/authActions";
import setAuthToken from "./state/utils/setAuthToken";

import Profile from "./components/Profile/Profile";
import ProfileUpdate from "./components/Profile/ProfileUpdate";
import ReTakeTest from "./components/Profile/ReTakeTest/ReTakeTest";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ResetPassword from "./components/Landing/ResetPassword";
import Uploadfiletest from "./components/Profile/Uploadfiletest";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log(state);

  const AC = bindActionCreators(actionCreators, dispatch);

  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []); //last [] is for run once

  const LandingContainer = () => (
    <div className="landingContainer">
      <Route path="/" exact component={Landing} />
    </div>
  );

  const loggedInContainer = () => (
    <div>
      {/* <Header component={Header} /> */}
      <br />
      <div className="loggedInContainer">
        <Route path="/register" component={Register} />
        <Route path="/activate*" component={ConfirmPage} />
        <Route path="/login" component={Login} />
        {/* <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password*" component={ResetPassword} /> */}
        <Route path="/dashboard" component={Dashboard} />
        {/* <Route path="/profile" component={Profile} />
        <Route path="/profile-update" component={ProfileUpdate} />
        <Route path="/uploadtest" component={Uploadfiletest} />
        <Route path="/test-update" component={ReTakeTest} /> */}
        {/* <Route path="/chatroom" component={ChatRoom} /> */}
        {/*  <Route path="/chat" component={Messenger} />*/}
        <Route path="/faq" component={FAQ} />
      </div>
      <br />
      <Footer component={Footer} />
    </div>
  );

  return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingContainer} />
          <Route component={loggedInContainer} />
        </Switch>
      </Router>
  );
};

export default App;
