import { GET_CURRENT_USER_AVATAR, GET_CURRENT_USER_AVATAR_ERROR } from "../actions/constants";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: true,
    avatar: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CURRENT_USER_AVATAR:
            return {
                ...state,
                avatar: payload,
                isLoading: false,
                isAuthenticated: true,
            }
        case GET_CURRENT_USER_AVATAR_ERROR:
            return {
                ...state,
                error: payload,
                isLoading: false,
                isAuthenticated: false,
            }
        default:
            return state;
    }
}