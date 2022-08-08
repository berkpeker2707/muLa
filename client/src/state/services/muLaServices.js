import axios from "axios";
import setAuthToken from "../utils/setAuthToken"

const loadUser = () => {
  if (localStorage.token) {
   setAuthToken(localStorage.token)
}
  return axios.get("/me");
};

const loadUserAvatar = () => {
  return axios.get(`/me/avatar`);
};

const registerUser = ({
  email,
  password,
  firstname,
  lastname,
  age,
  gender,
  job,
  description,

  userLatitude,
  userLongitude,
  language,
  belief,
  politics,
  diet,
  alcohol,
  smoking,

  extraversionValue,
  introversionValue,
  sensingValue,
  intuitionValue,
  thinkingValue,
  feelingValue,
  judgingValue,
  perceivingValue,
  characterType
}) => {

  //Header
  const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

//Request body
const body = JSON.stringify({
  email,
  password,
  firstname,
  lastname,
  age,
  gender,
  job,
  description,

  userLatitude,
  userLongitude,
  language,
  belief,
  politics,
  diet,
  alcohol,
  smoking,

  extraversionValue,
  introversionValue,
  sensingValue,
  intuitionValue,
  thinkingValue,
  feelingValue,
  judgingValue,
  perceivingValue,
  characterType
});

  return axios.post("/register", body, config);
};

const confirmTokenAction = ({token}) => {

  //Headers
  const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

const body = JSON.stringify({ token });

  return axios.post(`/activate/`, body, config);
};

const login = (email, password) => {

  //Headers
  const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

//Request body
const body = JSON.stringify({ email, password });

  return axios.post(`/login`), body, config;
};

// const logout = () => {
//   return axios.post(`/login`);
// };

const muLaServices = {
  loadUser,
  loadUserAvatar,
  registerUser,
  confirmTokenAction,
  login,
  // logout
};

export default muLaServices;