import axios from "axios";
import { apiURL } from "../config.json"

export const getProducts = () => axios.get(`${apiURL}/products`)

export const getProductById = productId => axios.get(`${apiURL}/products/${productId}`)

export const postProduct = product => axios.post(`${apiURL}/products`, product)

export const updateProductById = (productId, data) => axios.put(`${apiURL}/products/${productId}`, data)

export const removeProductById = productId => axios.delete(`${apiURL}/products/${productId}`)


