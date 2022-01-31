import axios from "axios";
import { clearErrors, returnErrors } from "./errorActions";
import { GET_LIKED, GET_LIKED_FAIL, LIKE_SUCCESS, LIKE_FAIL, UNLIKE_SUCCESS, UNLIKE_FAIL } from "./constants";

//Get Likes
export const getLiked = () => async dispatch => {
    try {
        const res = await axios.get("/liked");
        dispatch({
            type: GET_LIKED,
            payload: res.data
        });

        dispatch(clearErrors())
    } catch (err) {
        dispatch(
            returnErrors(err.response.data, err.response.status, "GET_LIKED_FAIL"),
        );
        dispatch({
            type: GET_LIKED_FAIL
        });
    }
}

//like action
export const likeUser = (params) => async dispatch => {
    try {
        const res = await axios.put("/like/"+params);
        dispatch({
            type: LIKE_SUCCESS,
            payload: res.data
        });

        dispatch(clearErrors())
    } catch(err){
        dispatch(
            returnErrors(err.response.data, err.response.status, "LIKE_FAIL"),
        );
        console.log(err.response)
        dispatch({
            type: LIKE_FAIL
        });
        console.log(err.response)

    }
}

//unlike action
export const unlikeUser = (params) => async dispatch => {
    try {
        const res = await axios.put("/unlike/"+params);
        dispatch({
            type: UNLIKE_SUCCESS,
            payload: res.data
        });
        dispatch(clearErrors())
    } catch(err){
        dispatch(
            returnErrors(err.response.data, err.response.status, "UNLIKE_FAIL"),
        );
        console.log(err.response)
        dispatch({
            type: UNLIKE_FAIL
        });
    }
}