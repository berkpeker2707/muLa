// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";

// const initialState = {
//   token: localStorage.getItem("token"),
//   isAuthenticated: null,
//   isLoading: true,
//   user: null,
//   avatar: null,
// };

// //register user action
// export const registerUser = createAsyncThunk(
//   "users/register",
//   async ({email,
//     password,
//     firstname,
//     lastname,
//     age,
//     gender,
//     job,
//     description,

//     userLatitude,
//     userLongitude,
//     language,
//     belief,
//     politics,
//     diet,
//     alcohol,
//     smoking,

//     extraversionValue,
//     introversionValue,
//     sensingValue,
//     intuitionValue,
//     thinkingValue,
//     feelingValue,
//     judgingValue,
//     perceivingValue,
//     characterType}, { rejectWithValue, getState, dispatch }) => {
//     try {
//       //http call
//       //Header
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       //Request body
//     const body = JSON.stringify({
//       email,
//       password,
//       firstname,
//       lastname,
//       age,
//       gender,
//       job,
//       description,

//       userLatitude,
//       userLongitude,
//       language,
//       belief,
//       politics,
//       diet,
//       alcohol,
//       smoking,

//       extraversionValue,
//       introversionValue,
//       sensingValue,
//       intuitionValue,
//       thinkingValue,
//       feelingValue,
//       judgingValue,
//       perceivingValue,
//       characterType
//   });
//       const { data } = await axios.post("/register", body, config);
//       return data;
//     } catch (error) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// //login user action
// export const loginUser = createAsyncThunk(
//   "login",
//   async (email, password, { rejectWithValue, getState, dispatch }) => {
//     //Headers
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     //Request body
//     const body = JSON.stringify({ email, password });
//     try {
//       const { data } = await axios.post("/login", body, config);
//       //save user to local storage
//       if (localStorage.token) {
//         await setAuthToken(localStorage.token);
//       }
//       return data;
//     } catch (error) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.message);
//     }
//   }
// );

// //slices
// const authSlices = createSlice({
//   name: "register",
//   initialState,
//   extraReducers: (builder) => {
//     //register
//     builder.addCase(registerUser.pending, (state, action) => {
//       state.isLoading = true;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(registerUser.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.registered = action?.payload;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(registerUser.rejected, (state, action) => {
//       state.isLoading = false;
//       state.appErr = action?.payload?.message;
//       state.serverErr = action?.error?.message;
//     });
//     //login
//     builder.addCase(loginUser.pending, (state,action) => {
//       state.isLoading = true;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(loginUser.fulfilled, (state,action) => {
//       state.isAuthenticated = action?.payload;
//       state.isLoading = false;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(loginUser.rejected, (state,action) => {
//       state.isLoading = false;
//       state.appErr = action?.payload?.message;;
//       state.serverErr = action?.error?.message;
//     })
//   },
// });

// export default authSlices.reducer;
