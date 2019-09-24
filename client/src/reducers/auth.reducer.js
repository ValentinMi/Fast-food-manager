import jwtDecode from "jwt-decode";
import { setJwt } from "../httpService";
import * as authConst from "../const/auth.const";

const initState = {
  user: {},
  pending: undefined,
  error: null
};

const authReducer = (state = initState, action) => {
  const { type, payload } = action;

  const tokenKey = "ffm-token";

  switch (type) {
    case authConst.LOGIN_PENDING:
      return { ...state, pending: true };
    case authConst.LOGIN_FULFILLED:
      return { ...state, pending: false };
    case authConst.LOGIN_REJECTED:
      return { ...state, pending: false, error: payload.message };
    default:
      return state;
  }
};

export default authReducer;
