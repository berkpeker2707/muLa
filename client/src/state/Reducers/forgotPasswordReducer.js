import { FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL } from "../actions/constants";

const initialState = {
    isAuthenticated: null,
    isLoading: true,
    email: null,
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
            }
        case FORGOT_PASSWORD_FAIL:
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