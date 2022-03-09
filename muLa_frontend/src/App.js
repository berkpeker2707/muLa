import React, { Fragment, useEffect } from "react";
import "./App.css";
// import Footer from "./components/Footer/Footer.js";
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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./components/Landing/ResetPassword";
import Uploadfiletest from "./components/Profile/Uploadfiletest";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // const state = useSelector((state) => state);
  // const dispatch = useDispatch();
  // console.log(state);

  // const AC = bindActionCreators(actionCreators, dispatch);

  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []); //last [] is for run once

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        {/* <Route element={<Header/>} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/activate*" element={<ConfirmPage />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password*" element={<ResetPassword/>} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/profile" element={<Profile/>} />
        <Route path="/profile-update" element={<ProfileUpdate/>} />
        <Route path="/uploadtest" element={<Uploadfiletest/>} />
        <Route path="/test-update" element={<ReTakeTest/>} /> */}
          {/* <Route path="/chatroom" element={<ChatRoom/>} /> */}
          {/*  <Route path="/chat" element={Messenger} />*/}
          <Route path="/faq" element={<FAQ />} />
        {/* <Route element={<Footer />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
