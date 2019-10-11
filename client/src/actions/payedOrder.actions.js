import * as payedOrderConst from "../const/payedOrder.const";
import * as payedOrderAPI from "../api/payedOrder.api";

export const getPayedOrders = () => dispatch => {
  dispatch({
    type: payedOrderConst.GET_PAYED_ORDERS,
    payload: payedOrderAPI.getPayedOrders()
  });
};

export const getPayedOrderById = id => dispatch => {
  dispatch({
    type: payedOrderConst.GET_PAYED_ORDER,
    payload: payedOrderAPI.getPayedOrderById(id)
  });
};

export const postPayedOrder = (order, totalPrice) => dispatch => {
  dispatch({
    type: payedOrderConst.POST_PAYED_ORDER,
    payload: payedOrderAPI.postPayedOrder(order, totalPrice)
  });

  dispatch({
    type: payedOrderConst.GET_PAYED_ORDERS,
    payload: payedOrderAPI.getPayedOrders()
  });
};

export const updatePayedOrderById = (id, newOrder) => dispatch => {
  dispatch({
    type: payedOrderConst.UPDATE_PAYED_ORDER,
    payload: payedOrderAPI.updatePayedOrderById(id, newOrder)
  });

  dispatch({
    type: payedOrderConst.GET_PAYED_ORDERS,
    payload: payedOrderAPI.getPayedOrders()
  });
};

export const removePayedOrderById = id => dispatch => {
  dispatch({
    type: payedOrderConst.REMOVE_PAYED_ORDER,
    payload: payedOrderAPI.removePayedOrderById(id)
  });

  dispatch({
    type: payedOrderConst.GET_PAYED_ORDERS,
    payload: payedOrderAPI.getPayedOrders()
  });
};
