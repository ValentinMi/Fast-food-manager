import http from "./http.api";
import { apiURL } from "../config.json";

const apiEndPoint = `${apiURL}/users`;

export const register = data => http.post(apiEndPoint, data);

export const updateUser = (userId, data) =>
  http.put(`${apiEndPoint}/${userId}`, data);
