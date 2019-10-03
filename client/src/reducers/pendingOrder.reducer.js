import * as pendingOrderConst from "../const/pendingOrder.const";

const initState = {
  pendingOrder: []
};

const pendingOrderReducer = (state = initState, action) => {
  // Clone pendingOrder
  let newPendingOrder = { ...state.pendingOrder };

  // Destructure action
  const { type, payload } = action;

  switch (type) {
    case pendingOrderConst.ADD_PRODUCT_TO_PENDING_ORDER:
      // Push new product in order
      newPendingOrder.push({
        product: payload.product,
        quantity: payload.quantity,
        price: payload.price
      });
      return { ...state, pendingOrder: newPendingOrder };

    case pendingOrderConst.REMOVE_PRODUCT_FROM_PENDING_ORDER:
      // Remove product from order
      newPendingOrder = newPendingOrder.filter(p => p.index !== payload.index);
      return { ...state, pendingOrder: newPendingOrder };

    case pendingOrderConst.SAVE_PENDING_ORDER_LOCALLY:
      // Set order in localStorage with user mail in key
      localStorage.setItem(
        `pendingOrderFrom${payload.user.data.email}`,
        JSON.stringify(payload.pendingOrder)
      );
      return state;

    case pendingOrderConst.GET_SAVED_PENDING_ORDER:
      // Get order from localStorage with user email
      const savedOrder = localStorage.getItem(
        `pendingOrderFrom${payload.user.data.email}`
      );

      // Check if it's stored

      // If null
      if (savedOrder === null) return { ...state };
      // If order is stored
      return { ...state, pendingOrder: JSON.parse(savedOrder) };

    case pendingOrderConst.REMOVE_SAVED_PENDING_ORDER:
      // Remove order from localStorage with user email
      localStorage.removeItem(`pendingOrderFrom${payload.user.data.email}`);
      return { ...initState };
    default:
      return state;
  }
};

export default pendingOrderReducer;
