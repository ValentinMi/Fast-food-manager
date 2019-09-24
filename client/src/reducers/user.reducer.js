import * as userConst from "../const/user.const";
import * as authConst from "../const/auth.const";

const initState = {
  token: undefined,
  user: {
    isAdmin: true
  },
  error: null
};

const userReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userConst.REGISTER_USER_PENDING:
      return { ...state };
    case userConst.REGISTER_USER_FULFILLED:
      return { ...state };
    case userConst.REGISTER_USER_REJECTED:
      return { ...state, error: payload.message };
    case userConst.UPDATE_USER:
      return { ...state };
    case authConst.LOGIN_PENDING:
      return { ...state };
    case authConst.LOGIN_FULFILLED:
      console.log(payload);
      return { ...state, token: payload };

    default:
      return state;
  }
};

export default userReducer;
