import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

/////////////
// actions //
/////////////

export const registerUserAction = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      //http call
      //Header
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

////////////
// slices //
////////////

const conversationSlices = createSlice({
  name: "conversation",
  initialState: {
    conversation: "",
  },

  extraReducers: (builder) => {
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
  },
});

export default conversationSlices.reducer;
