import * as userConst from "../const/user.const";
import * as userAPI from "../api/user.api";

export const register = user => dispatch => {
  dispatch({
    type: userConst.REGISTER,
    payload: userAPI.register(user)
  });
};

export const updateUser = newUser => dispatch => {
  dispatch({
    type: userConst.UPDATE_USER,
    payload: userAPI.updateUser(newUser)
  });
};
