import * as productConst from "../const/product.const";
import * as productAPI from "../api/product.api"

export const getProducts = () => dispatch => {
   dispatch({
    type: productConst.GET_PRODUCTS,
    payload: productAPI.getProducts()
  });
}

export const postProduct = product => async dispatch => {
  await dispatch({
    type: productConst.POST_PRODUCT,
    payload: productAPI.postProduct(product)
  });

    dispatch({
    type: productConst.GET_PRODUCTS,
    payload: productAPI.getProducts()
  })
}

export const removeProductById = productId => async dispatch => {
  await dispatch({
    type: productConst.REMOVE_PRODUCT,
    payload: productAPI.removeProductById(productId)
  });

   dispatch({
    type: productConst.GET_PRODUCTS,
    payload: productAPI.getProducts()
  })
}

