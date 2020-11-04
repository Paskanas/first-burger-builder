import axios from "axios";
import * as actionTypes from "./actionTypes";
import { miliSecondsToSeconds } from "../../utils/utils";
import { key } from "../const";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  //   localStorage.removeItem("userId"); // TODO remove this line
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkOffTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, miliSecondsToSeconds(expirationTime));
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + key;
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        key;
    }
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + miliSecondsToSeconds(response.data.expiresIn)
        );

        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        // localStorage.setItem("userId", response.data.localId); // TODO remove this line
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkOffTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRederectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        axios
          .post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
              key,
            { idToken: token }
          )
          .then((response) => {
            dispatch(authSuccess(token, response.data.users[0].localId));
          })
          .catch((error) => {
            dispatch(logout());
          });
        // TODO comment below
        // const userId = localStorage.getItem("userId");
        // dispatch(authSuccess(token, userId));

        const expiryTime =
          (expirationDate.getTime() - new Date().getTime()) / 1000;

        dispatch(checkOffTimeout(expiryTime));
      } else {
        dispatch(logout());
      }
    }
  };
};
