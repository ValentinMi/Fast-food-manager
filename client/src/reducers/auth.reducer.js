import jwtDecode from "jwt-decode";
import { setJwt } from "../httpService";
import { toast } from "react-toastify";
import * as authConst from "../const/auth.const";

const initState = {
  user: {
    data: {},
    isLogged: false,
    token: undefined
  },
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
      return {
        ...state,
        pending: false,
        user: {
          ...state.user,
          data: jwtDecode(payload.data),
          token: payload.data,
          isLogged: true
        }
      };
    case authConst.LOGIN_REJECTED:
      toast.error("Invalid email or password");
      return { ...state, pending: false, error: payload.message };

    case authConst.LOGIN_WITH_JWT:
      // Get jwt from localstorage and decode it
      let token = localStorage.getItem(tokenKey);
      // If token exist
      if (token !== null) {
        // SET TOKEN IN AXIOS HEADERS
        setJwt(token);

        return {
          ...state,
          user: {
            ...state.user,
            data: jwtDecode(token),
            token: token,
            isLogged: true
          }
        };
      }
      // If not return
      return { ...initState };
    case authConst.LOGOUT:
      localStorage.removeItem(tokenKey);
      return { ...initState };

    case authConst.SET_JWT:
      // SET TOKEN IN AXIOS HEADERS
      setJwt(state.user.token);
      // SET TOKEN IN LOCALSTORAGE
      localStorage.setItem(tokenKey, state.user.token);
      return { ...state };

    default:
      return state;
  }
};

export default authReducer;
