import * as payedOrderConst from "../const/payedOrder.const";
import * as payedOrderAPI from "../api/payedOrder.api";

export const getPayedOrders = () => dispatch => {
  dispatch({
    type: payedOrderConst.GET_PAYED_ORDERS,
    payload: payedOrderAPI.getPayedOrders()
  });
};

export const getPayedOrderById = id => async dispatch => {
  await dispatch({
    type: payedOrderConst.GET_PAYED_ORDER,
    payload: payedOrderAPI.getPayedOrderById(id)
  });
};

export const postPayedOrder = (order, totalPrice) => async dispatch => {
  await dispatch({
    type: payedOrderConst.POST_PAYED_ORDER,
    payload: payedOrderAPI.postPayedOrder(order, totalPrice)
  });

  dispatch({
    type: payedOrderConst.GET_PAYED_ORDERS,
    payload: payedOrderAPI.getPayedOrders()
  });
};

export const updatePayedOrderById = (id, newOrder) => async dispatch => {
  await dispatch({
    type: payedOrderConst.UPDATE_PAYED_ORDER,
    payload: payedOrderAPI.updatePayedOrderById(id, newOrder)
  });

  dispatch({
    type: payedOrderConst.GET_PAYED_ORDERS,
    payload: payedOrderAPI.getPayedOrders()
  });
};

export const removePayedOrderById = id => async dispatch => {
  await dispatch({
    type: payedOrderConst.REMOVE_PAYED_ORDER,
    payload: payedOrderAPI.removePayedOrderById(id)
  });

  dispatch({
    type: payedOrderConst.GET_PAYED_ORDERS,
    payload: payedOrderAPI.getPayedOrders()
  });
};
