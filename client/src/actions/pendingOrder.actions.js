import * as pendingOrderConst from "../const/pendingOrder.const";

export const addProductToOrder = (name, quantity, price) => ({
  type: pendingOrderConst.ADD_PRODUCT_TO_PENDING_ORDER,
  payload: {
    name,
    quantity,
    price
  }
});

export const removeProductFromOrder = name => ({
  type: pendingOrderConst.REMOVE_PRODUCT_FROM_PENDING_ORDER,
  payload: {
    name
  }
});

export const savePendingOrderLocally = (pendingOrder, user) => ({
  type: pendingOrderConst.SAVE_PENDING_ORDER_LOCALLY,
  payload: {
    pendingOrder,
    user
  }
});

export const getSavedPendingOrder = user => ({
  type: pendingOrderConst.GET_SAVED_PENDING_ORDER,
  payload: {
    user
  }
});

export const removeSavedPendingOrder = user => ({
  type: pendingOrderConst.REMOVE_SAVED_PENDING_ORDER,
  payload: {
    user
  }
});
