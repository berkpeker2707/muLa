import axios from "axios";
import { GET_CURRENT_USER, GET_CURRENT_USER_ERROR } from "./constants";
import { returnErrors } from "./errorActions";

//Get current user
export const getCurrentUser = () => async dispatch => {
    try {
        const res = await axios.get("/me");
        dispatch({
            type: GET_CURRENT_USER,
            payload: res.data
        })
    } catch (err) {
        dispatch(
            returnErrors(err.response.data, err.response.status, "GET_CURRENT_USER_ERROR")
        );
        dispatch({ type: GET_CURRENT_USER_ERROR });
    }
}