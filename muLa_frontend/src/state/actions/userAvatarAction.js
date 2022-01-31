import axios from "axios";
import { GET_CURRENT_USER_AVATAR, GET_CURRENT_USER_AVATAR_ERROR} from "./constants";
import { returnErrors } from "./errorActions";

//Get current user
export const getCurrentUserAvatar = (profilePicture) => async dispatch => {
    try {
        const res = await axios.get("/me/avatar/",{params:{profilePicture}});
        dispatch({
            type: GET_CURRENT_USER_AVATAR,
            payload: res.data
        })
    } catch (err) {
        dispatch(
            returnErrors(err.response.data, err.response.status, "GET_CURRENT_USER_AVATAR_ERROR")
        );
        dispatch({ type: GET_CURRENT_USER_AVATAR_ERROR });
    }
}