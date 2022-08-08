import axios from "axios";
import { FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL } from "./constants";
import { returnErrors } from "./errorActions";

export const forgotPasswordActions = ({
    email
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
        email
    });

    try {

        const res = await axios.put("/forgot-password", body, config);
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: res.data
        });

        dispatch({ type: FORGOT_PASSWORD_SUCCESS });

    } catch (err) {
        console.log(err);
        dispatch(
            returnErrors(err.response, err.response.status, "FORGOT_PASSWORD_FAIL")
        );
        dispatch({ type: FORGOT_PASSWORD_FAIL });
    }
}