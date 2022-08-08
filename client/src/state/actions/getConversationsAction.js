import axios from "axios";
import { GET_CONVERSATIONS, GET_CONVERSATIONS_FAIL } from "./constants";
import { returnErrors } from "./errorActions";

//Get current user
export const getConversations = ({user}) => async dispatch => {
    try {
        const res = await axios.get("/conversations/" + user.user._id);
        dispatch({
            type: GET_CONVERSATIONS,
            payload: res.data
        })
    } catch (err) {
        dispatch(
            returnErrors(err.response.data, err.response.status, "GET_CONVERSATIONS_FAIL")
        );
        dispatch({ type: GET_CONVERSATIONS_FAIL });
    }
}