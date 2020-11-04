import * as actionTypes from "../actions/actionTypes";
import * as utils from "../../common/utils";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const authStart = (state) => {
  return utils.updateObject(state, { loading: true, error: null });
};

const authSuccess = (state, action) => {
  return utils.updateObject(state, {
    loading: false,
    token: action.idToken,
    userId: action.userId,
    error: action.error,
  });
};

const authFail = (state, action) => {
  return utils.updateObject(state, { loading: false, error: action.error });
};

const logOut = (state, action) => {
  return utils.updateObject(state, { userId: null, token: null });
};

const setPathRedirectPath = (state, action) => {
  return utils.updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logOut(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setPathRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
