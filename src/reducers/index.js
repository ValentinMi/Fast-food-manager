import { combineReducers } from "redux";

import productReducer from "./product.reducer";
import userReducer from "./user.reducer";
import orderReducer from "./order.reducer";

export default combineReducers({
  productReducer,
  userReducer,
  orderReducer
});
