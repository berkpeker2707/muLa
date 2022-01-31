import axios from "axios";
import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from "./constants";
import { returnErrors } from "./errorActions";

export const resetPasswordActions = ({
    resetLink,
    newPass
}
) => async dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    //Request body
    const body = JSON.stringify({
        resetLink,
        newPass
    });

    try {

        const res = await axios.put("/reset-password", body, config);
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: res.data
        });
        // dispatch({ type: RESET_PASSWORD_SUCCESS });

    } catch (err) {
        console.log(err);
        dispatch(
            returnErrors(err.response, err.response.status, "RESET_PASSWORD_FAIL")
        );
        dispatch({ type: RESET_PASSWORD_FAIL });
    }
}