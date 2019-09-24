import http from "./http.api";
import { apiURL } from "../config.json";

const apiEndPoint = `${apiURL}/auth`;

export const login = data => http.post(apiEndPoint, data);
