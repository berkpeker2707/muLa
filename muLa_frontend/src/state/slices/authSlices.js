import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: null,
  user: null,
  users: null,
};

/////////////
// actions //
/////////////
//register user action
export const registerUser = createAsyncThunk(
  "register",
  async ({email,
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
    characterType}, { rejectWithValue, getState, dispatch }) => {
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
      characterType
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
  async (userData, { rejectWithValue, getState, dispatch }) => {
    //Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //Request body
    // const body = JSON.stringify({ email, password });
    try {
      const { data } = await axios.post(
        "/api/user/login",
        userData,
        config
        );
      //save user to local storage
      // if (localStorage.token) {
      //   await setAuthToken(localStorage.token);
      // }
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

//get users on page load
export const getUsers = createAsyncThunk(
  "getUsers",
  async (getUsers, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },  
    };
    try {
      const { data } = await axios.get("/api/users", config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update user
export const updatePostAction = createAsyncThunk(
  "post/updated",
  async (post, { rejectWithValue, getState, dispatch }) => {
    console.log(post);
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.put(
        `/api/posts/${post?.id}`,
        post,
        config
      );
      //dispatch
      dispatch(resetPostEdit());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

////////////
// slices //
////////////

//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const authSlices = createSlice({
  name: "auth",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: (builder) => {
    builder
      //register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.registered = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.appErr = action.payload.message;
        state.serverErr = action.error.message;
      })

      //login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.user = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.isAuthenticated = action.payload;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.appErr = action.payload.message;
        state.serverErr = action.error.message;
        state.user = undefined;
      })

      //get all users
      .addCase(getUsers.pending, (state, action) => {
        state.isLoading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.users = action.payload.users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.appErr = action.payload.message;
        state.serverErr = action.error.message;
      })

    //update profile
    .addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(resetPostEdit, (state, action) => {
      state.isUpdated = true;
    })
    .addCase(updatePostAction.fulfilled, (state, action) => {
      state.postUpdated = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isUpdated = false;
    })
    .addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })

    //update avatar

    //forgot password

    //reset password

    //retake test

    //like

    //dislike

    //unlike

    //match

    //get conversations

    //block

    //mute

    //report
  },
});

export default authSlices.reducer;
