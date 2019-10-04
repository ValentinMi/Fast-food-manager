import * as pendingOrderConst from "../const/pendingOrder.const";

const initState = {
  pendingOrder: []
};

const pendingOrderReducer = (state = initState, action) => {
  // Clone pendingOrder
  let newPendingOrder = [...state.pendingOrder];

  // Destructure action
  const { type, payload } = action;

  switch (type) {
    case pendingOrderConst.ADD_PRODUCT_TO_PENDING_ORDER:
      // Check if product is already in order
      let product = newPendingOrder.find(
        product => product.name === payload.name
      );

      if (product !== undefined) {
        // If yes, adjust product quantity
        let prevProduct = newPendingOrder[newPendingOrder.indexOf(product)];
        prevProduct.quantity += payload.quantity;

        return { ...state, pendingOrder: newPendingOrder };
      } else {
        // Push new product in order
        newPendingOrder.push({
          name: payload.name,
          quantity: payload.quantity,
          price: payload.price
        });
        return { ...state, pendingOrder: newPendingOrder };
      }

    case pendingOrderConst.REMOVE_PRODUCT_FROM_PENDING_ORDER:
      // Remove product from order
      newPendingOrder = newPendingOrder.filter(p => p.name !== payload.name);
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
      let savedOrder = JSON.parse(
        localStorage.getItem(`pendingOrderFrom${payload.user.data.email}`)
      );

      // Check if it's stored
      // If null => return
      if (savedOrder === null) return { ...state };
      // If order is stored => check if all products still exists
      // const products = payload.products;

      // console.log(products, "test");

      return { ...state, pendingOrder: savedOrder };

    case pendingOrderConst.REMOVE_SAVED_PENDING_ORDER:
      localStorage.removeItem(`pendingOrderFrom${payload.user.data.email}`);
      return { ...initState };
    default:
      return state;
  }
};

export default pendingOrderReducer;
