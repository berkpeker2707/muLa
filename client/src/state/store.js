import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import usersReducer from "./slices/usersSlices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export default store;
