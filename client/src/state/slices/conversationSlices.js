import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/////////////
// actions //
/////////////

export const postConversationAction = createAsyncThunk(
  "conversation/new",
  async (conversationData, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth;
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `/api/conversation/new`,
        conversationData,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const getConversationsAction = createAsyncThunk(
  "conversation/my-conversations",
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
        `/api/conversation/my-conversations`,
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
export const getConversationWithIDsAction = createAsyncThunk(
  "conversation/:firstUserId/:secondUserId",
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
        `/api/conversation/:firstUserId/:secondUserId`,
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

const conversationSlices = createSlice({
  name: "conversation",
  initialState: {
    conversation: "",
  },

  extraReducers: (builder) => {
    // postConversationAction Reducer
    builder.addCase(postConversationAction.pending, (state) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(postConversationAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.postedConversation = action?.payload;
    });
    builder.addCase(postConversationAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    // getConversationsAction Reducer
    builder.addCase(getConversationsAction.pending, (state) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getConversationsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.conversation = action?.payload;
    });
    builder.addCase(getConversationsAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    // getConversationWithIDsAction Reducer
    builder.addCase(getConversationWithIDsAction.pending, (state) => {
      state.isLoading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getConversationWithIDsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.conversationWithIDs = action?.payload;
    });
    builder.addCase(getConversationWithIDsAction.rejected, (state, action) => {
      state.isLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default conversationSlices.reducer;
