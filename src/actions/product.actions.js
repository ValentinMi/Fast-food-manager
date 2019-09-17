import * as productConst from "../const/product.const";

export const addProduct = newProduct => ({
  type: productConst.ADD_PRODUCT,
  payload: newProduct
});

export const removeProduct = index => ({
  type: productConst.REMOVE_PRODUCT,
  payload: {
    index
  }
});

export const refoundProduct = (index, selectValue) => ({
  type: productConst.REFOUND_PRODUCT,
  payload: {
    index,
    selectValue
  }
});
