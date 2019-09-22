import * as userConst from "../const/user.const";

const initState = {
  user: {
    isAdmin: true
  }
};

const userReducer = (state = initState, action) => {
  const { user } = state;

  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
