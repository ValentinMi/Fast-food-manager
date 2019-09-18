import * as orderConst from "../const/order.const";

const initState = {
  orders: {
    pendingOrder: [],
    payedOrders: []
  }
};

const orderReducer = (state = initState, action) => {
  // Clone orders
  let newOrders = { ...state.orders };

  // Destructure action
  const { type, payload } = action;

  switch (type) {
    // ADD PRODUCT IN ORDER LIST
    case orderConst.ADD_PRODUCT_TO_ORDER:
      // Check if product is already in order
      let index = newOrders.pendingOrder.findIndex(
        p => p.name === payload.product.name
      );
      if (index !== -1) {
        // Add the quantity to existing product and ajust the price
        newOrders.pendingOrder[index].quantity += payload.quantity;
        newOrders.pendingOrder[index].price +=
          payload.product.price * payload.quantity;
        return { ...state, orders: newOrders };
      } else {
        // Push product in pendingOrder
        newOrders.pendingOrder.push({
          name: payload.product.name,
          quantity: payload.quantity,
          price: payload.price * payload.quantity
        });
        return { ...state, orders: newOrders };
      }

    // REMOVE PRODUCT FROM ORDER LIST
    case orderConst.REMOVE_PRODUCT_FROM_ORDER:
      // Remove it from pendingOrder
      newOrders.pendingOrder = newOrders.pendingOrder.filter(
        p => p !== state.orders.pendingOrder[payload.index]
      );
      return { ...state, orders: newOrders };

    // BUY THE ORDER
    case orderConst.BUY_ORDER:
      // Clear pendingOrder & add it to payedOrder
      newOrders.payedOrders.push(newOrders.pendingOrder);
      newOrders.pendingOrder = [];
      return {
        ...state,
        orders: newOrders
      };

    // SEND THE ORDER
    case orderConst.SEND_ORDER:
      newOrders.payedOrders = newOrders.payedOrders.filter(
        p => p !== state.orders.payedOrders[payload.index]
      );
      return { ...state, orders: newOrders };

    default:
      return state;
  }
};

export default orderReducer;
