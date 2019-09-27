import * as pendingOrderConst from "../const/pendingOrder.const";

export const addProductToOrder = (product, quantity, price) => ({
  type: orderConst.ADD_PRODUCT_TO_ORDER,
  payload: {
    product,
    quantity,
    price
  }
});

export const removeProductFromOrder = index => ({
  type: orderConst.REMOVE_PRODUCT_FROM_ORDER,
  payload: {
    index
  }
});

export const buyOrder = orderList => ({
  type: orderConst.BUY_ORDER,
  payload: {
    orderList
  }
});
