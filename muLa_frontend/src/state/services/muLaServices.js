import axios from "axios";

const loadUser = () => {
  return axios.get("/me");
};

const loadUserAvatar = id => {
  return axios.get(`/me/avatar`);
};

const registerUser = data => {
  return axios.post("/register", data);
};

const confirmTokenAction = ({token}) => {
  return axios.post(`/activate/`, data);
};

const login = id => {
  return axios.post(`/login`);
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