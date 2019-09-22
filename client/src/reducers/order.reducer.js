import * as orderConst from "../const/order.const";

const initState = {
  orders: {
    pendingOrder: [],
    payedOrders: [],
    onLoad: true
  }
};

const orderReducer = (state = initState, action) => {

  // Destructure action
  const { type, payload } = action;

  switch (type) {
   

    default:
      return state;
  }
};

export default orderReducer;
