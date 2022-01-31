import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import currentUserReducer from "./currentUserReducer";
import passwordResetReducer from "./passwordResetReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import userAvatarReducer from "./userAvatarReducer";
import likeReducer from "./likeReducer";

const reducers = combineReducers({
    error: errorReducer,
    auth: authReducer,
    users: usersReducer,
    user: currentUserReducer,
    avatar: userAvatarReducer,
    forgotpassword: forgotPasswordReducer,
    passwordreset: passwordResetReducer,
    likeReducer: likeReducer,
});

export default reducers;