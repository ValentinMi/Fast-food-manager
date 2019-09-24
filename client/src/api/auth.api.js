import http from "../httpService";
import { apiURL } from "../config.json";

const apiEndPoint = `${apiURL}/auth`;

export const login = data => http.post(apiEndPoint, data);
