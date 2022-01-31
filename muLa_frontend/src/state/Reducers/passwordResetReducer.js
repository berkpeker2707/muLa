import { RESET_USER_PASSWORD, RESET_USER_PASSWORD_ERROR } from "../actions/constants";

const initialState = {
    isAuthenticated: null,
    isLoading: true,
    resetLink: null,
    newPass: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case RESET_USER_PASSWORD:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
            }
        case RESET_USER_PASSWORD_ERROR:
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