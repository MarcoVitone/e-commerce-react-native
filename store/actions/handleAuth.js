import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const LOGOUT = "LOGOUT";
export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";

export const authSignupSuccess = (userData) => {
  return {
    type: AUTH_SUCCESS,
    userName: userData.displayName,
    userID: userData.uid,
    token: userData.accessToken,
  };
};

export const authSigninSuccess = (userData) => {
  return {
    type: AUTH_SUCCESS,
    userName: userData.displayName,
    userID: userData.localId,
    token: userData.idToken,
  };
};

export const handleLogout = () => {
  return {
    type: LOGOUT,
    userName: "",
    userID: "",
    token: "",
  };
};

export const fetchStart = () => {
  return {
    type: FETCH_START,
  };
};

export const fetchSuccess = () => {
  return {
    type: FETCH_SUCCESS,
  };
};

export const fetchError = (error) => {
  return {
    type: FETCH_ERROR,
    error,
  };
};

// function to save on asyncStorage
const saveData = async (user) => {
  await AsyncStorage.setItem("userData", JSON.stringify(user));
};

// upload user data
export const uploadUser = (userName, email, password) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      // post email & password on firebase

      const user = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANfV4BgmXinhCBvII2u6Veg_m5x1Lla8s`,
        {
          email,
          password,
          retunrSecureToken: true,
          displayName: userName,
        }
      );
      const userID = user.data.localId;
      const token = user.data.idToken;

      // post on database user info
      const res = await axios.post(
        `https://e-commerce-a1908-default-rtdb.europe-west1.firebasedatabase.app/Users/${userID}.json`,
        {
          userName,
          userID,
        }
      );

      // save userID & token in async storage
      saveData({ userName: userName, userID: userID, token: token });
      dispatch(authSignupSuccess(user.user));
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

// login function
export const userLogin = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANfV4BgmXinhCBvII2u6Veg_m5x1Lla8s`,
        {
          email,
          password,
          retunrSecureToken: true,
        }
      );
      const user = res.data;
      dispatch(authSigninSuccess(user));
      // save userName, userID & token in async storage
      saveData({
        userName: user.displayName,
        userID: user.localId,
        token: user.idToken,
      });
      dispatch(fetchSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      dispatch(clearAsyncStorage());
      dispatch(handleLogout());
      dispatch(fetchSuccess);
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};
