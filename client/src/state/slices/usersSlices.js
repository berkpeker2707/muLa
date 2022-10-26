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

//get all users
export const getUsersAction = createAsyncThunk(
  "user/all",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.auth;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`/api/user/all`, config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

const usersSlices = createSlice({
  name: "users",
  initialState: {
    users: "",
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
    //getUsers
    builder.addCase(getUsersAction.pending, (state, action) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getUsersAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.users = action.payload;
    });
    builder.addCase(getUsersAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
  },
});

export default usersSlices.reducer;
