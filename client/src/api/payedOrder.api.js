import http from "../httpService";
import { apiURL } from "../config.json";

const apiEndPoint = `${apiURL}/payedOrders`;

export const getPayedOrders = () => http.get(apiEndPoint);

export const getPayedOrderById = id => http.get(apiEndPoint, id);

export const postPayedOrder = (order, totalPrice) =>
  http.post(apiEndPoint, { products: order, totalPrice });

export const updatePayedOrderById = (id, newOrder) =>
  http.put(apiEndPoint, id, newOrder);

export const removePayedOrderById = id => http.delete(apiEndPoint, id);
