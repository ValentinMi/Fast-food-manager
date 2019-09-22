import * as userConst from "../const/user.const";
import * as userAPI from "../api/user.api";

export const register = data => dispatch => {
  dispatch({
    type: userConst.REGISTER,
    payload: userAPI.register(data)
  });
};

export const updateUser = data => dispatch => {
  dispatch({
    type: userConst.UPDATE_USER,
    payload: userAPI.updateUser(data)
  });
};
