import * as productConst from "../const/product.const";
import { toast } from "react-toastify";

const initState = {
  products: [],
  onLoad: undefined,
  error: null
};

const productReducer = (state = initState, action) => {
  // Destructure action
  const { type, payload } = action;

  switch (type) {
    // GET PRODUCTS
    case productConst.GET_PRODUCTS_PENDING:
      return { ...state, onLoad: true };
    case productConst.GET_PRODUCTS_FULFILLED:
      return { ...state, products: payload.data, onLoad: false };
    case productConst.GET_PRODUCTS_REJECTED:
      return { ...state, onLoad: false, error: payload.message };
    // POST NEW PRODUCTS
    case productConst.POST_PRODUCT_PENDING:
      return { ...state, onLoad: true };
    case productConst.POST_PRODUCT_FULFILLED:
      toast.info("Product added");
      return { ...state, onLoad: false };
    case productConst.POST_PRODUCT_REJECTED:
      return { ...state, onLoad: false, error: payload.message };
    // DELETE PRODUCT
    case productConst.REMOVE_PRODUCT_PENDING:
      return { ...state, onLoad: true };
    case productConst.REMOVE_PRODUCT_FULFILLED:
      return { ...state, onLoad: false };
    case productConst.REMOVE_PRODUCT_REJECTED:
      return { ...state, onLoad: false, error: payload.message };
    default:
      return state;
  }
};

export default productReducer;
