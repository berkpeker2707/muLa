import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

// const initialState = {
//   token: localStorage.getItem("token"),
//   isAuthenticated: null,
//   isLoading: null,
//   user: null,
//   conversations: null,
//   messages: null,
// };

/////////////
// actions //
/////////////

export const preRegisterAction = createAsyncThunk(
  "auth/preRegister",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("api/auth/pre-register", user, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const verifyRegisterAction = createAsyncThunk(
  "auth/verifyRegister",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const registerUserAction = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("api/auth/register", user, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const loginUserAction = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/api/auth/login", userData, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const forgotPasswordAction = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/api/auth/login", userData, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const verifyPasswordAction = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/api/auth/login", userData, config);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      await localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

////////////
// slices //
////////////

// //get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const authSlices = createSlice({
  name: "auth",
  initialState: {
    auth: userLoginFromStorage,
  },

  extraReducers: (builder) => {
    // preRegister reducer

    // verifyRegister reducer
    // registerUser reducer
    // loginUser reducer
    // forgotPassword reducer
    // verifyPassword reducer
    // logout reducer

    //register
    builder.addCase(registerUserAction.pending, (state) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.registered = action?.payload;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //validate
    builder.addCase(verifyRegisterAction.pending, (state) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(verifyRegisterAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.validated = action?.payload;
    });
    builder.addCase(verifyRegisterAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //login
    builder.addCase(loginUserAction.pending, (state) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.auth = action?.payload;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.auth = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });

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

// //Redirect action
// const resetUserAction = createAction("user/profile/reset");
// const resetPasswordAction = createAction("password/reset");

// // Profile
// export const userProfileAction = createAsyncThunk(
//   "user/profile",
//   async (id, { rejectWithValue, getState, dispatch }) => {
//     //get user token
//     const user = getState()?.users;
//     const { auth } = user;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${auth?.token}`,
//       },
//     };
//     //http call
//     try {
//       const { data } = await axios.get(
//         `/api/users/profile/${id}`,
//         config
//       );
//       return data;
//     } catch (error) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// // Follow
// export const followUserAction = createAsyncThunk(
//   "user/follow",
//   async (userToFollowId, { rejectWithValue, getState, dispatch }) => {
//     //get user token
//     const user = getState()?.users;
//     const { auth } = user;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${auth?.token}`,
//       },
//     };
//     //http call
//     try {
//       const { data } = await axios.put(
//         `/api/users/follow`,
//         { followId: userToFollowId },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// // unFollow
// export const unfollowUserAction = createAsyncThunk(
//   "user/unfollow",
//   async (unFollowId, { rejectWithValue, getState, dispatch }) => {
//     //get user token
//     const user = getState()?.users;
//     const { auth } = user;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${auth?.token}`,
//       },
//     };
//     //http call
//     try {
//       const { data } = await axios.put(
//         `/api/users/unfollow`,
//         { unFollowId },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// //Update action
// export const updateUserAction = createAsyncThunk(
//   "users/update",
//   async (userData, { rejectWithValue, getState, dispatch }) => {
//     //get user token
//     const user = getState()?.users;
//     const { auth } = user;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${auth?.token}`,
//       },
//     };
//     //http call
//     try {
//       const { data } = await axios.put(
//         `/api/users`,
//         {
//           lastName: userData?.lastName,
//           firstName: userData?.firstName,
//           bio: userData?.bio,
//           email: userData?.email,
//         },
//         config
//       );
//       //dispatch
//       dispatch(resetUserAction());
//       return data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// //Update Password
// export const updatePasswordAction = createAsyncThunk(
//   "password/update",
//   async (password, { rejectWithValue, getState, dispatch }) => {
//     //get user token
//     const user = getState()?.users;
//     const { auth } = user;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${auth?.token}`,
//       },
//     };
//     //http call
//     try {
//       const { data } = await axios.put(
//         `/api/users/password`,
//         {
//           password,
//         },
//         config
//       );
//       //dispatch
//       dispatch(resetPasswordAction());
//       return data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// //fetch User details
// export const fetchUserDetailsAction = createAsyncThunk(
//   "user/detail",
//   async (id, { rejectWithValue, getState, dispatch }) => {
//     try {
//       const { data } = await axios.get(`/api/users/select/${id}`);
//       return data;
//     } catch (error) {
//       if (!error?.response) throw error;
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// //fetch all users
// export const getUsersAction = createAsyncThunk(
//   "user/list",
//   async (id, { rejectWithValue, getState, dispatch }) => {
//     //get user token
//     const user = getState()?.users;
//     const { auth } = user;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${auth?.token}`,
//       },
//     };
//     try {
//       const { data } = await axios.get(`/api/users`, config);
//       return data;
//     } catch (error) {
//       if (!error?.response) throw error;
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// //Block User
// export const blockUserAction = createAsyncThunk(
//   "user/block",
//   async (id, { rejectWithValue, getState, dispatch }) => {
//     //get user token
//     const user = getState()?.users;
//     const { auth } = user;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${auth?.token}`,
//       },
//     };
//     try {
//       const { data } = await axios.put(
//         `/api/users/block-user/${id}`,
//         {},
//         config
//       );
//       return data;
//     } catch (error) {
//       if (!error?.response) throw error;
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// //unBlock User
// export const unBlockUserAction = createAsyncThunk(
//   "user/unblock",
//   async (id, { rejectWithValue, getState, dispatch }) => {
//     //get user token
//     const user = getState()?.users;
//     const { auth } = user;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${auth?.token}`,
//       },
//     };
//     try {
//       const { data } = await axios.put(
//         `/api/users/unblock-user/${id}`,
//         {},
//         config
//       );
//       return data;
//     } catch (error) {
//       if (!error?.response) throw error;
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// //Upload Profile Photo
// export const uploadProfilePhototAction = createAsyncThunk(
//   "user/profile-photo",
//   async (userImg, { rejectWithValue, getState, dispatch }) => {
//     console.log(userImg);
//     //get user token
//     const user = getState()?.users;
//     const { auth } = user;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${auth?.token}`,
//       },
//     };
//     try {
//       //http call
//       const formData = new FormData();

//       formData.append("image", userImg?.image);

//       const { data } = await axios.put(
//         `/api/users/profilephoto-upload`,
//         formData,
//         config
//       );
//       return data;
//     } catch (error) {
//       if (!error?.response) throw error;
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// //Password reset token generator
// export const passwordResetTokenAction = createAsyncThunk(
//   "password/token",
//   async (email, { rejectWithValue, getState, dispatch }) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     //http call
//     try {
//       const { data } = await axios.post(
//         `/api/users/forget-password-token`,
//         { email },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// //Password reset
// export const passwordResetAction = createAsyncThunk(
//   "password/reset",
//   async (user, { rejectWithValue, getState, dispatch }) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     //http call
//     try {
//       const { data } = await axios.put(
//         `/api/users/reset-password`,
//         { password: user?.password, token: user?.token },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// //slices
// const usersSlices = createSlice({
//   name: "users",
//   extraReducers: builder => {
//     //register
//     builder.addCase(registerUserAction.pending, (state, action) => {
//       state.loading = true;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(registerUserAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.registered = action?.payload;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(registerUserAction.rejected, (state, action) => {
//       console.log(action.payload);
//       state.loading = false;
//       state.appErr = action?.payload?.message;
//       state.serverErr = action?.error?.message;
//     });
//     //Password reset token generator
//     builder.addCase(passwordResetTokenAction.pending, (state, action) => {
//       state.loading = true;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(passwordResetTokenAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.passwordToken = action?.payload;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(passwordResetTokenAction.rejected, (state, action) => {
//       state.loading = false;
//       state.appErr = action?.payload?.message;
//       state.serverErr = action?.error?.message;
//     });

//     //Password reset
//     builder.addCase(passwordResetAction.pending, (state, action) => {
//       state.loading = true;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(passwordResetAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.passwordReset = action?.payload;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(passwordResetAction.rejected, (state, action) => {
//       state.loading = false;
//       state.appErr = action?.payload?.message;
//       state.serverErr = action?.error?.message;
//     });

//     //user details
//     builder.addCase(fetchUserDetailsAction.pending, (state, action) => {
//       state.loading = true;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.userDetails = action?.payload;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
//       console.log(action.payload);
//       state.loading = false;
//       state.appErr = action?.payload?.message;
//       state.serverErr = action?.error?.message;
//     });

//     //Block user
//     builder.addCase(blockUserAction.pending, (state, action) => {
//       state.loading = true;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(blockUserAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.block = action?.payload;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(blockUserAction.rejected, (state, action) => {
//       console.log(action.payload);
//       state.loading = false;
//       state.appErr = action?.payload?.message;
//       state.serverErr = action?.error?.message;
//     });
//     //unBlock user
//     builder.addCase(unBlockUserAction.pending, (state, action) => {
//       state.loading = true;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(unBlockUserAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.unblock = action?.payload;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(unBlockUserAction.rejected, (state, action) => {
//       console.log(action.payload);
//       state.loading = false;
//       state.appErr = action?.payload?.message;
//       state.serverErr = action?.error?.message;
//     });
//     //All Users
//     builder.addCase(getUsersAction.pending, (state, action) => {
//       state.loading = true;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(getUsersAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.usersList = action?.payload;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(getUsersAction.rejected, (state, action) => {
//       console.log(action.payload);
//       state.loading = false;
//       state.appErr = action?.payload?.message;
//       state.serverErr = action?.error?.message;
//     });

//     //user Follow
//     builder.addCase(followUserAction.pending, (state, action) => {
//       state.loading = true;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(followUserAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.followed = action?.payload;
//       state.unFollowed = undefined;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(followUserAction.rejected, (state, action) => {
//       state.loading = false;
//       state.appErr = action?.payload?.message;
//       state.unFollowed = undefined;
//       state.serverErr = action?.error?.message;
//     });

//     //user unFollow
//     builder.addCase(unfollowUserAction.pending, (state, action) => {
//       state.unfollowLoading = true;
//       state.unFollowedAppErr = undefined;
//       state.unfollowServerErr = undefined;
//     });
//     builder.addCase(unfollowUserAction.fulfilled, (state, action) => {
//       state.unfollowLoading = false;
//       state.unFollowed = action?.payload;
//       state.followed = undefined;
//       state.unFollowedAppErr = undefined;
//       state.unfollowServerErr = undefined;
//     });
//     builder.addCase(unfollowUserAction.rejected, (state, action) => {
//       state.unfollowLoading = false;
//       state.unFollowedAppErr = action?.payload?.message;
//       state.unfollowServerErr = action?.error?.message;
//     });
//     //login
//     builder.addCase(loginUserAction.pending, (state, action) => {
//       state.loading = true;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(loginUserAction.fulfilled, (state, action) => {
//       state.auth = action?.payload;
//       state.loading = false;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(loginUserAction.rejected, (state, action) => {
//       state.appErr = action?.payload?.message;
//       state.serverErr = action?.error?.message;
//       state.loading = false;
//     });

//     //Profile
//     builder.addCase(userProfileAction.pending, (state, action) => {
//       state.profileLoading = true;
//       state.profileAppErr = undefined;
//       state.profileServerErr = undefined;
//     });
//     builder.addCase(userProfileAction.fulfilled, (state, action) => {
//       state.profile = action?.payload;
//       state.profileLoading = false;
//       state.profileAppErr = undefined;
//       state.profileServerErr = undefined;
//     });
//     builder.addCase(userProfileAction.rejected, (state, action) => {
//       state.profileAppErr = action?.payload?.message;
//       state.profileServerErr = action?.error?.message;
//       state.profileLoading = false;
//     });

//     //update
//     builder.addCase(updateUserAction.pending, (state, action) => {
//       state.loading = true;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(resetUserAction, (state, action) => {
//       state.isUpdated = true;
//     });
//     builder.addCase(updateUserAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.userUpdated = action?.payload;
//       state.isUpdated = false;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(updateUserAction.rejected, (state, action) => {
//       console.log(action.payload);
//       state.loading = false;
//       state.appErr = action?.payload?.message;
//       state.serverErr = action?.error?.message;
//     });
//     //update password
//     builder.addCase(updatePasswordAction.pending, (state, action) => {
//       state.loading = true;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(resetPasswordAction, (state, action) => {
//       state.isPasswordUpdated = true;
//     });
//     builder.addCase(updatePasswordAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.passwordUpdated = action?.payload;
//       state.isPasswordUpdated = false;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(updatePasswordAction.rejected, (state, action) => {
//       console.log(action.payload);
//       state.loading = false;
//       state.appErr = action?.payload?.message;
//       state.serverErr = action?.error?.message;
//     });

//     //Upload Profile photo
//     builder.addCase(uploadProfilePhototAction.pending, (state, action) => {
//       state.loading = true;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(uploadProfilePhototAction.fulfilled, (state, action) => {
//       state.profilePhoto = action?.payload;
//       state.loading = false;
//       state.appErr = undefined;
//       state.serverErr = undefined;
//     });
//     builder.addCase(uploadProfilePhototAction.rejected, (state, action) => {
//       state.appErr = action?.payload?.message;
//       state.serverErr = action?.error?.message;
//       state.loading = false;
//     });

//   },
// });
