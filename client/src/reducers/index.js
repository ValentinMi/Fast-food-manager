import { combineReducers } from "redux";

import productReducer from "./product.reducer";
import userReducer from "./user.reducer";
import orderReducer from "./order.reducer";
import authReducer from "./auth.reducer";

export default combineReducers({
  productReducer,
  orderReducer,
  userReducer,
  authReducer
});
