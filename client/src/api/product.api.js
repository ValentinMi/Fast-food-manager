import http from "../httpService";
import { apiURL } from "../config.json";

const apiEndPoint = apiURL + "/products";

export const getProducts = () => http.get(apiEndPoint);

export const getProductById = productId =>
  http.get(`${apiEndPoint}/${productId}`);

export const postProduct = product => http.post(apiEndPoint, product);

export const updateProductById = (productId, data) =>
  http.put(`${apiEndPoint}/${productId}`, data);

export const removeProductById = productId =>
  http.delete(`${apiEndPoint}/${productId}`);
