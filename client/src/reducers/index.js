import { combineReducers } from "redux";

import productReducer from "./product.reducer";
import pendingOrderReducer from "./pendingOrder.reducer";
import payedOrderReducer from "./payedOrder.reducer";
import userReducer from "./user.reducer";
import authReducer from "./auth.reducer";
import themeReducer from "./theme.reducer";

export default combineReducers({
  productReducer,
  payedOrderReducer,
  userReducer,
  authReducer,
  pendingOrderReducer,
  themeReducer
});
