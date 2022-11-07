import React, { Fragment, useEffect } from "react";
import "./App.css";

import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import FAQ from "./components/Footer/FAQ.js";
import Privacy from "./components/Footer/Privacy.js";
import About from "./components/Footer/About.js";

import Landing from "./components/Landing/Landing.js";
import Register from "./components/Landing/Register/Register.js";
import ConfirmPage from "./components/Landing/Register/ConfirmPage.js";
import Login from "./components/Landing/Login/Login.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import ChatRoom from "./components/Chat/ChatRoom.js";
import ForgotPassword from "./components/Landing/ForgotPassword";
import PrivateRoute from "./components/Routing/PrivateRoute";

//redux
import Profile from "./components/Profile/Profile";
import ProfileUpdate from "./components/Profile/ProfileUpdate";
import ReTakeTest from "./components/Profile/ReTakeTest/ReTakeTest";

import { BrowserRouter, routes, Route } from "react-router-dom";
import ResetPassword from "./components/Landing/ResetPassword";
import Uploadfiletest from "./components/Profile/Uploadfiletest";

import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";

const theme = extendTheme({
  palette: {
    primary: {
      light: "#1e3d10",
      main: "#1e3d59",
      dark: "#fff",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fff",
      main: "#ff6e40",
      dark: "#fff",
      contrastText: "#fff",
    },
    tertiary: {
      light: "#fff",
      main: "#ffc13b",
      dark: "#fff",
      contrastText: "#fff",
    },
    backgroundColor: {
      light: "#fff",
      main: "#f5f0e1",
      dark: "#fff",
      contrastText: "#fff",
    },
  },
});
const App = () => {
  return (
    <CssVarsProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-account/:token" element={<ConfirmPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/*" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-update" element={<ProfileUpdate />} />
          <Route path="/uploadtest" element={<Uploadfiletest />} />
          <Route path="/test-update" element={<ReTakeTest />} />
          <Route path="/chatroom" element={<ChatRoom />} />
          {/* <Route path="/chat" element={Messenger} /> */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about" element={<About />} />
        </routes>
        <Footer />
      </BrowserRouter>
    </CssVarsProvider>
  );
};

export default App;
