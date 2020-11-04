import reducer from "./auth";

import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store the token upon login ", () => {
    const state = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    };

    const actions = {
      type: actionTypes.AUTH_START,
    };
    expect(reducer(state, actions)).toEqual({
      token: null,
      userId: null,
      authRedirectPath: "/",
      loading: true,
      error: null,
    });
  });

  it("should store the token upon login ", () => {
    const ititialState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    };

    const actions = {
      type: actionTypes.AUTH_SUCCESS,
      idToken: "action.idToken",
      userId: "action.userId",
      error: "action.error",
    };
    expect(reducer(ititialState, actions)).toEqual({
      loading: false,
      authRedirectPath: "/",
      token: "action.idToken",
      userId: "action.userId",
      error: "action.error",
    });
  });
});
