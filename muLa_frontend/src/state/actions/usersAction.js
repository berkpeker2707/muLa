import axios from "axios";
import { GET_USERS, GET_USERS_ERROR } from "./constants";
import { returnErrors } from "./errorActions";

// Get Users
export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get("/users");
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    } catch (err) {
        dispatch(
            returnErrors(err.response.data, err.response.status, "GET_USERS_ERROR")
        );
        dispatch({ type: GET_USERS_ERROR });
    }
}

// export const getUsers = (res) => {
//   try {
//     return (dispatch) => {
//       dispatch({ type: GET_USERS, payload: res.data });
//     };
//   } catch (err) {
//     dispatch(
//       { type: GET_USERS_ERROR },
//       returnErrors(err.response.data, err.response.status, "GET_USERS_ERROR")
//     );
//   }
// };