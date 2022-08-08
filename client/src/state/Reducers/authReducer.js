import {
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_ACTIVATED,
    USER_UPDATED,
    USER_UPDATE_FAIL,
    GET_CURRENT_USER_AVATAR,
    GET_CURRENT_USER_AVATAR_ERROR

} from "../actions/constants";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: true,
    user: null,
    avatar:null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
        case GET_CURRENT_USER_AVATAR:
        case USER_UPDATED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: payload,
                avatar:payload
            }
        case REGISTER_SUCCESS:
            // localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                isLoading: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_ACTIVATED:
        case USER_UPDATED:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                ...payload,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        case USER_UPDATE_FAIL:
        case GET_CURRENT_USER_AVATAR_ERROR:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                users: null,
            };
        default:
            return state;
    }
}
