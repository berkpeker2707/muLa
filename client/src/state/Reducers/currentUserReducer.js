import { GET_CURRENT_USER, GET_CURRENT_USER_ERROR } from "../actions/constants";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: true,
    user: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CURRENT_USER:
            return {
                user: payload,
                isLoading: false,
                isAuthenticated: true,
            }
        case GET_CURRENT_USER_ERROR:
            return {
                user:[],
                isLoading: false,
                isAuthenticated: false,
            }
        default:
            return state;
    }
}