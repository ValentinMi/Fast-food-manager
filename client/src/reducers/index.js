import { combineReducers } from "redux";

import productReducer from "./product.reducer";
import pendingOrderReducer from "./pendingOrder.reducer";
import payedOrderReducer from "./payedOrder.reducer";
import userReducer from "./user.reducer";
import authReducer from "./auth.reducer";

export default combineReducers({
  productReducer,
  pendingOrderReducer,
  payedOrderReducer,
  userReducer,
  authReducer
});
