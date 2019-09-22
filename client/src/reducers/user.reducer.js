import * as userConst from "../const/user.const";

const initState = {
  user: {
    isAdmin: true
  }
};

const userReducer = (state = initState, action) => {
  const { user } = state;

  switch (action.type) {
    // User become admin
    case userConst.BECOME_ADMIN:
      return { ...state, user: { ...user, isAdmin: true } };
    // User become customer
    case userConst.BECOME_CUSTOMER:
      return { ...state, user: { ...user, isAdmin: false } };
    default:
      return state;
  }
};

export default userReducer;
