import {
  GET_LIKED,
  GET_LIKED_FAIL,
  LIKE_SUCCESS,
  LIKE_FAIL,
  UNLIKE_SUCCESS,
  UNLIKE_FAIL,
} from "../actions/constants";

const initialState = {
  liked: [],
  like: null,
  isLoading: true,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LIKED:
            return {
                ...state,
                liked:payload,
                isLoading: false,
            }
        case LIKE_SUCCESS:
        case UNLIKE_SUCCESS:
            return {
                ...state,
                ...payload,
                isLoading: false,
            };
        case GET_LIKED_FAIL:
        case LIKE_FAIL:
        case UNLIKE_FAIL:
            return {
                ...state,
                isLoading: false,
                liked: [],
                like: null,
            };
        default:
            return state;
    }
}