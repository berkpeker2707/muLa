import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlices";
import conversationReducer from "./slices/conversationSlices";
import messageReducer from "./slices/messageSlices";
import usersReducer from "./slices/usersSlices";

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  conversation: conversationReducer,
  message: messageReducer,
  users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export default store;
