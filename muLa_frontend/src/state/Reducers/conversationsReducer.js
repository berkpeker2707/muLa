import { GET_CONVERSATIONS, GET_CONVERSATIONS_FAIL } from "../actions/constants";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: true,
    user: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CONVERSATIONS:
            return {
                ...state,
                conversation: payload,
                isLoading: false,
                isAuthenticated: true,
            }
        case GET_CONVERSATIONS_FAIL:
            return {
                conversation:payload,
                ...state,
                error: payload,
                isLoading: false,
                isAuthenticated: false,
            }
        default:
            return state;
    }
}