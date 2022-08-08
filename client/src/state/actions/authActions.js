import axios from "axios";
import { clearErrors, returnErrors } from "./errorActions";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_ACTIVATED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    USER_AVATAR_LOADED,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
} from "./constants";
import setAuthToken from "../utils/setAuthToken"

//Load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        await setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get("/me");
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

        dispatch(clearErrors())
    } catch (err) {
        dispatch(
            returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"),
        );
        dispatch({
            type: AUTH_ERROR
        });
    }
}

//Load user avatar
export const loadUserAvatar = () => async dispatch => {
    
    try {
        const res = await axios.get("/me/avatar");

        dispatch({
            type: USER_AVATAR_LOADED,
            payload: res.data
        });

        dispatch(clearErrors())
    } catch (err) {
        dispatch(
            returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"),
        );
        dispatch({
            type: AUTH_ERROR
        });
    }
}

//Register user action
export const registerUser = ({
    email,
    password,
    firstname,
    lastname,
    age,
    gender,
    job,
    description,

    userLatitude,
    userLongitude,
    language,
    belief,
    politics,
    diet,
    alcohol,
    smoking,

    extraversionValue,
    introversionValue,
    sensingValue,
    intuitionValue,
    thinkingValue,
    feelingValue,
    judgingValue,
    perceivingValue,
    characterType
}) => async dispatch => {
    //Header
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    //Request body
    const body = JSON.stringify({
        email,
        password,
        firstname,
        lastname,
        age,
        gender,
        job,
        description,

        userLatitude,
        userLongitude,
        language,
        belief,
        politics,
        diet,
        alcohol,
        smoking,

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
        const res = await axios.post("/register", body, config);
        //console.log(res.data)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(clearErrors())

        // dispatch(loadUser());

    } catch (err) {
        // console.log(err.response.data)
        dispatch(
            returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"),
        );
        dispatch({ type: REGISTER_FAIL });
    }

}

//Register activation action
export const confirmTokenAction = ({ token }) => async dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ token });

    try {
        const res = await axios.post("/activate", body, config);
        dispatch({
            type: REGISTER_ACTIVATED,
            payload: res.data
        })

        dispatch(loadUser());
        dispatch(clearErrors())

    } catch (err) {
        dispatch(
            returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({ type: REGISTER_FAIL });
    }
}

//Login User
export const login = (email, password) => async dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    //Request body
    const body = JSON.stringify({ email, password });

    try {

        const res = await axios.post("/login", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
        dispatch(clearErrors())

    } catch (err) {
        dispatch(
            returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
            type: LOGIN_FAIL,
        });

    }
};

//Logout User
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS,
    })
};