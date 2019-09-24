import * as authConst from "../const/auth.const";
import * as authAPI from "../api/auth.api";

export const login = data => async dispatch => {
  await dispatch({
    type: authConst.LOGIN,
    payload: authAPI.login(data)
  });

  dispatch({
    type: authConst.SET_JWT
  });
};

export const loginWithJwt = () => dispatch => {
  dispatch({
    type: authConst.LOGIN_WITH_JWT
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: authConst.LOGOUT
  });
};
