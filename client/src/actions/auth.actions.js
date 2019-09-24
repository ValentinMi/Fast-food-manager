import * as authConst from "../const/auth.const";
import * as authAPI from "../api/auth.api";

export const login = data => dispatch => {
  dispatch({
    type: authConst.LOGIN,
    payload: authAPI.login(data)
  });
};
