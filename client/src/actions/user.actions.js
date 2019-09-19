import * as userConst from "../const/user.const";

export const becomeCustomer = () => ({
  type: userConst.BECOME_CUSTOMER
});

export const becomeAdmin = () => ({
  type: userConst.BECOME_ADMIN
});
