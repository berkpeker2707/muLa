import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

//////////////
// actions ///
//////////////

//reset state action
const resetAction = createAction("user/reset");

//register user action
export const registerUser = createAsyncThunk(
  "register",
  async (
    {
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
      characterType,
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      //http call
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
        characterType,
      });
      const { data } = await axios.post("/register", body, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//login user action
export const loginUser = createAsyncThunk(
  "login",
  async (body, { rejectWithValue, getState, dispatch }) => {
    //Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/login", body, config);
      //save user to local storage
      if (localStorage.token) {
        await setAuthToken(localStorage.token);
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.message);
    }
  }
);

//get users on page load
export const getUsers = createAsyncThunk(
  "getUsers",
  async (getUsers, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    try {
      const { data } = await axios.get("api/users");
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slices(reducers)
const usersSlices = createSlice({
  name: "users",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: null,
    user: null,
    users: null,
  },
  extraReducers: (builder) => {
    //registerUser
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //loginUser
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isAuthenticated = true;
      state.token = action?.payload?.token;
      state.user = action?.payload?.user;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //getUsers
    builder.addCase(getUsers.pending, (state, action) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.users = action.payload.users;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
  },
});

export default usersSlices.reducer;
