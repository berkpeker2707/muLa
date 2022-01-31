import axios from "axios";
import {
USER_LOADED,
USER_AVATAR_LOADED,
AUTH_ERROR,

LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT_FAIL,

FORGOT_PASSWORD_SUCCESS,
FORGOT_PASSWORD_FAIL,

RESET_PASSWORD_SUCCESS,
RESET_PASSWORD_FAIL,

LOGOUT_SUCCESS,

GET_ERRORS,
CLEAR_ERRORS,

REGISTER_SUCCESS,
REGISTER_FAIL,
REGISTER_ACTIVATED,

RESET_USER_PASSWORD,
RESET_USER_PASSWORD_ERROR,

GET_USERS,
GET_USERS_ERROR,

GET_CURRENT_USER_AVATAR,
GET_CURRENT_USER_AVATAR_ERROR,

GET_CURRENT_USER,
GET_CURRENT_USER_ERROR,

USER_UPDATED,
USER_UPDATE_FAIL,

GET_MATCHES,
MATCHES_LOADED,
MATCHES_FAIL,

GET_CONVERSATIONS,
GET_CONVERSATIONS_FAIL,

GET_LIKED,
GET_LIKED_FAIL,

LIKE_SUCCESS,
LIKE_FAIL,

UNLIKE_SUCCESS,
UNLIKE_FAIL,
} from "./constants";
import setAuthToken from "../utils/setAuthToken"

//Load user
export const loadUser = async () => {
  if (localStorage.token) {
    await setAuthToken(localStorage.token);
  }
      const res = await axios.get("/me");

  try {
    return (dispatch) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });

      // dispatch(clearErrors())
    };
  } catch (err) {
    return (dispatch) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: AUTH_ERROR,
      });
    };
  }
};

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

////////////////////
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

////////////////////
//Get Users
// export const getUsers = () => async dispatch => {
//     try {
//         const res = await axios.get("/users");
//         dispatch({
//             type: GET_USERS,
//             payload: res.data
//         })
//     } catch (err) {
//         dispatch(
//             returnErrors(err.response.data, err.response.status, "GET_USERS_ERROR")
//         );
//         dispatch({ type: GET_USERS_ERROR });
//     }
// }

export const getUsers = async () => {
//   try {
const res = await axios.get("/users");
    return (dispatch) => {
      dispatch({ type: GET_USERS, payload: res.data });
    };
//   } catch (err) {
//       return(dispatch) =>{
//     dispatch(
//       { type: GET_USERS_ERROR },
//       returnErrors(err.response.data, err.response.status, "GET_USERS_ERROR")
//     );
//   }
//   }
};

////////////////////
//Return Erros
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id },
    };
};

//Clear Erros
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};

////////////////////
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

////////////////////
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

////////////////////
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

////////////////////
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

////////////////////
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

////////////////////
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

////////////////////
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