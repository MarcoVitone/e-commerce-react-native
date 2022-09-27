import * as actionTypes from "../actions/handleAuth";

const initialState = {
  userName: "",
  userID: "",
  token: "",
  loading: false,
  error: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        userName: action.userName,
        userID: action.userID,
        token: action.token,
      };
    }
    case actionTypes.LOGOUT: {
      return {
        ...state,
        userName: "",
        userID: "",
        token: "",
      };
    }
    case actionTypes.FETCH_START: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case actionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    case actionTypes.FETCH_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
