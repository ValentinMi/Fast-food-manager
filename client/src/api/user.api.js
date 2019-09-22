import http from "../httpService";
import { apiURL } from "../config.json";

const apiEndPoint = apiURL + "/users";

export const register = user => http.post(apiEndPoint, user);

export const updateUser = (userId, data) =>
  http.put(`${apiEndPoint}/${userId}`, data);
