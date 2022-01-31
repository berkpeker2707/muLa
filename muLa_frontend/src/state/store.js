import { createStore, applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import reducers from "./Reducers";

import errorReducer from "./Reducers/errorReducer";
import authReducer from "./Reducers/authReducer";
import usersReducer from "./Reducers/usersReducer";
import currentUserReducer from "./Reducers/currentUserReducer";
import passwordResetReducer from "./Reducers/passwordResetReducer";
import forgotPasswordReducer from "./Reducers/forgotPasswordReducer";
import userAvatarReducer from "./Reducers/userAvatarReducer";
import likeReducer from "./Reducers/likeReducer";

export default configureStore({
    reducer: {
        errorReducer: errorReducer,
        authReducer: authReducer,
        usersReducer: usersReducer,
        currentUserReducer: currentUserReducer,
        passwordResetReducer: passwordResetReducer,
        forgotPasswordReducer: forgotPasswordReducer,
        userAvatarReducer: userAvatarReducer,
        likeReducer: likeReducer
    }
})

// const initialState = {};
// const middleware = [thunk];

// const store = createStore(
//     reducers,
//     initialState,
//     compose(
//         applyMiddleware(...middleware),
//         // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

// export default store;
