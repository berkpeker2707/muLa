import { GET_USERS, GET_USERS_ERROR } from "../actions/constants";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    isLoading: true,
    users: []
}

// export default function (state = initialState, action) {
//     const { type, payload } = action;

//     switch (type) {
//         case GET_USERS:
//             return {
//                 ...state,
//                 users: payload,
//                 isLoading: false,
//                 isAuthenticated: true,
//             }
//         case GET_USERS_ERROR:
//             return {
//                 ...state,
//                 users: [],
//                 error: payload,
//                 isLoading: false,
//                 isAuthenticated: false,
//             }
//         default:
//             return state;
//     }
// }

const usersReducer = (state = initialState, action) => {
const { type, payload } = action;

switch (type) {
    case GET_USERS:
        return {
            ...state,
            users: payload,
            isLoading: false,
            isAuthenticated: true,
        }
    case GET_USERS_ERROR:
        return {
            ...state,
            users: [],
            error: payload,
            isLoading: false,
            isAuthenticated: false,
        }
    default:
        return state;
}
}
export default usersReducer;