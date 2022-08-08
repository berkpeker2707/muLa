import axios from "axios";
import { GET_CURRENT_USER, USER_UPDATED, USER_UPDATE_FAIL } from "./constants";
import { returnErrors } from "./errorActions";

export const updateProfile = ({
    password,

    firstname,
    lastname,
    age,
    gender,
    job,
    description,
    
    language,
    belief,
    politics,
    diet,
    alcohol,
    smoking,
}, history , edit= false) => async dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    //Request body
    const body = JSON.stringify({
        password,

        firstname,
        lastname,
        age,
        gender,
        job,
        description,

        language,
        belief,
        politics,
        diet,
        alcohol,
        smoking,
    });

    try {
        const res = await axios.put("/me-update", body, config);
        dispatch({
            type: GET_CURRENT_USER,
            payload: res.data
        });

        dispatch({ type: USER_UPDATED });

        if(edit){
            history.push("/profile")
        }
    } catch (err) {
        console.log(err);
        dispatch(
            returnErrors(err.response,  "USER_UPDATE_FAIL")
        );
        dispatch({ type: USER_UPDATE_FAIL });
    }
}