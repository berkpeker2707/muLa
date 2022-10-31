import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/////////////
// actions //
/////////////

export const getLoggedInAction = createAsyncThunk(
  "user/me",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`/api/user/me`, _, config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const getUserAction = createAsyncThunk(
  "user/select/:id",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`/api/user/select/${id}`, config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const getAllUserAction = createAsyncThunk(
  "user/all",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`/api/user/all`, _, config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const updateUserAction = createAsyncThunk(
  "user/update",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(`/api/user/update`, _, config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const updateUsersTestAction = createAsyncThunk(
  "user/update/test",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(`/api/user/update/test`, _, config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const updateUserPasswordAction = createAsyncThunk(
  "user/update/password",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(`/api/user/update/password`, _, config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const profilePhotoUploadAction = createAsyncThunk(
  "user/image/profile/upload",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `/api/user/image/profile/upload`,
        _,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const profilePhotoDeleteAction = createAsyncThunk(
  "user/image/profile/delete",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `/api/user/image/profile/delete`,
        _,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const photoUploadAction = createAsyncThunk(
  "user/image/upload",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(`/api/user/image/upload`, _, config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const photoDeleteAction = createAsyncThunk(
  "user/image/delete",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.delete(`/api/user/image/delete`, _, config);
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

const usersSlices = createSlice({
  name: "users",
  initialState: {
    users: "",
  },

  extraReducers: (builder) => {
    // getLoggedInAction Action
    builder.addCase(getLoggedInAction.pending, (state, action) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getLoggedInAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.me = action.payload;
    });
    builder.addCase(getLoggedInAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
    // getUserAction Action
    builder.addCase(getUserAction.pending, (state, action) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.selectedUser = action.payload;
    });
    builder.addCase(getUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
    // getAllUserAction Reducer
    builder.addCase(getAllUserAction.pending, (state, action) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getAllUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.allUsers = action.payload;
    });
    builder.addCase(getAllUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
    // updateUserAction Reducer
    builder.addCase(updateUserAction.pending, (state, action) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.updatedMe = action.payload;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
    // updateUsersTestAction Reducer
    builder.addCase(updateUsersTestAction.pending, (state, action) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateUsersTestAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.updatedTest = action.payload;
    });
    builder.addCase(updateUsersTestAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
    // updateUserPasswordAction Reducer
    builder.addCase(updateUserPasswordAction.pending, (state, action) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateUserPasswordAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.updatedPassword = action.payload;
    });
    builder.addCase(updateUserPasswordAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
    // profilePhotoUploadAction Reducer
    builder.addCase(profilePhotoUploadAction.pending, (state, action) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(profilePhotoUploadAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.uploadedProfilePhoto = action.payload;
    });
    builder.addCase(profilePhotoUploadAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
    // profilePhotoDeleteAction Reducer
    builder.addCase(profilePhotoDeleteAction.pending, (state, action) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(profilePhotoDeleteAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.uploadedProfilePhoto = undefined;
    });
    builder.addCase(profilePhotoDeleteAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
    // photoUploadAction Reducer
    builder.addCase(photoUploadAction.pending, (state, action) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(photoUploadAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.uploadedPhoto = action.payload;
    });
    builder.addCase(photoUploadAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
    // photoDeleteAction Reducer
    builder.addCase(photoDeleteAction.pending, (state, action) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(photoDeleteAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.uploadedPhoto = undefined;
    });
    builder.addCase(photoDeleteAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });
  },
});

export default usersSlices.reducer;
