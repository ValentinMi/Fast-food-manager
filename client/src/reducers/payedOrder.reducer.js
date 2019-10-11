import * as payedOrderConst from "../const/payedOrder.const";

const initState = {
  payedOrders: null,
  selectedOrder: undefined,
  isLoading: false,
  error: null
};

const payedOrderReducer = (state = initState, action) => {
  // Destructure action
  const { type, payload } = action;

  // GET /
  switch (type) {
    case payedOrderConst.GET_PAYED_ORDERS_PENDING:
      return { ...state, isLoading: true };
    case payedOrderConst.GET_PAYED_ORDERS_REJECTED:
      return { ...state, isLoading: false, error: payload.message };
    case payedOrderConst.GET_PAYED_ORDERS_FULFILLED:
      return { ...state, isLoading: false, payedOrders: payload.data };

    // GET /:id
    case payedOrderConst.GET_PAYED_ORDERS_PENDING:
      return { ...state, isLoading: true };
    case payedOrderConst.GET_PAYED_ORDER_REJECTED:
      return { ...state, isLoading: false, error: payload.message };
    case payedOrderConst.GET_PAYED_ORDER_FULFILLED:
      return { ...state, isLoading: false, selectedOrder: payload.data };

    // POST /
    case payedOrderConst.POST_PAYED_ORDER_PENDING:
      return { ...state, isLoading: true };
    case payedOrderConst.POST_PAYED_ORDER_REJECTED:
      console.log(payload);
      return { ...state, isLoading: false, error: payload.message };
    case payedOrderConst.POST_PAYED_ORDER_FULFILLED:
      return { ...state, isLoading: false };

    // PUT /:id
    case payedOrderConst.UPDATE_PAYED_ORDER_PENDING:
      return { ...state, isLoading: true };
    case payedOrderConst.UPDATE_PAYED_ORDER_REJECTED:
      return { ...state, isLoading: false, error: payload.message };
    case payedOrderConst.UPDATE_PAYED_ORDER_FULFILLED:
      return { ...state, isLoading: false };

    // DELETE /:id
    case payedOrderConst.REMOVE_PAYED_ORDER_PENDING:
      return { ...state, isLoading: true };
    case payedOrderConst.REMOVE_PAYED_ORDER_REJECTED:
      return { ...state, isLoading: false, error: payload.message };
    case payedOrderConst.REMOVE_PAYED_ORDER_FULFILLED:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default payedOrderReducer;
