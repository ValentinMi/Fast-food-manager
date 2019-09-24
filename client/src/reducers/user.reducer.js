import * as userConst from "../const/user.const";

const initState = {
  pending: undefined,
  error: null
};

const userReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userConst.REGISTER_USER_PENDING:
      return { ...state, pending: true };
    case userConst.REGISTER_USER_FULFILLED:
      return { ...state, pending: false };
    case userConst.REGISTER_USER_REJECTED:
      return { ...state, pending: false, error: payload.message };
    case userConst.UPDATE_USER:
      return { ...state };
    default:
      return state;
  }
};

export default userReducer;
