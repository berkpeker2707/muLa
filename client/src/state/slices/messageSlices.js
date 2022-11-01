import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

/////////////
// actions //
/////////////

export const postMessageAction = createAsyncThunk(
  "message/new/:conversationId",
  async (messageData, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `/api/message/new/:conversationId`,
        messageData,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const getMessageAction = createAsyncThunk(
  "message/all/:conversationId",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `/api/message/all/:conversationId`,
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

////////////
// slices //
////////////

const messageSlices = createSlice({
  name: "message",
  initialState: {
    message: "",
  },

  extraReducers: (builder) => {
    // postMessageAction Reducer
    builder.addCase(postMessageAction.pending, (state) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(postMessageAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.postedMessage = action?.payload;
    });
    builder.addCase(postMessageAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // getMessageAction Reducer
    builder.addCase(getMessageAction.pending, (state) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getMessageAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.fetchedMessage = action?.payload;
    });
    builder.addCase(getMessageAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default messageSlices.reducer;
