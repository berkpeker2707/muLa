import axios from "axios";
import { GET_CURRENT_USER, USER_UPDATED, USER_UPDATE_FAIL } from "./constants";
import { returnErrors } from "./errorActions";

export const reTakeTestUpdate = ({
    extraversionValue,
    introversionValue,
    sensingValue,
    intuitionValue,
    thinkingValue,
    feelingValue,
    judgingValue,
    perceivingValue,
    characterType
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
        extraversionValue,
        introversionValue,
        sensingValue,
        intuitionValue,
        thinkingValue,
        feelingValue,
        judgingValue,
        perceivingValue,
        characterType
    });

    try {

        const res = await axios.put("/test-update", body, config);
        dispatch({
            type: GET_CURRENT_USER,
            payload: res.data
        });
        dispatch({ type: USER_UPDATED });

        window.location.reload();
    } catch (err) {
        console.log(err);
        dispatch(
            returnErrors(err.response, err.response.status, "USER_UPDATE_FAIL")
        );
        dispatch({ type: USER_UPDATE_FAIL });
    }
}