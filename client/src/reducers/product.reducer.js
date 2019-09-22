import * as productConst from "../const/product.const";

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
      return {...state, onLoad: true}
    case productConst.GET_PRODUCTS_FULFILLED:
      return {...state, products: payload.data, onLoad: false}
    case productConst.GET_PRODUCTS_REJECTED:
      return {...state, onLoad: false, error: payload.message}
    // POST PRODUCTS
    case productConst.POST_PRODUCT_PENDING:
      return {...state, onLoad: true}
    case productConst.POST_PRODUCT_FULFILLED:
      return {...state, onLoad: false}
     case productConst.POST_PRODUCT_REJECTED:
      return {...state, onLoad: false, error: payload.message}
    // DELETE PRODUCT
    case productConst.REMOVE_PRODUCT_PENDING:
      return {...state, onLoad: true}
    case productConst.REMOVE_PRODUCT_FULFILLED:
      return {...state, onLoad: false}
     case productConst.REMOVE_PRODUCT_REJECTED:
      return {...state, onLoad: false, error: payload.message}
    default:
      return state;
  }
};

export default productReducer;








// ADD NEW PRODUCT
    // case productConst.ADD_PRODUCT:
    //   return { ...state, products: [...state.products, payload] };

    // // REMOVE PRODUCT
    // case productConst.REMOVE_PRODUCT:
    //   //  Reverse filter to remove a product
    //   newProducts = newProducts.filter(
    //     p => p !== state.products[payload.index]
    //   );
    //   return {
    //     ...state,
    //     products: newProducts
    //   };

    // // REFOUND
    // case productConst.REFOUND_PRODUCT:
    //   // Add selected value
    //   newProducts[payload.index].stock += payload.selectValue;
    //   return {
    //     ...state,
    //     products: newProducts
    //   };

    // // SUBSTRACT
    // case productConst.SUBSTRACT_PRODUCT:
    //   newProducts[payload.index].stock -= payload.value;
    //   return { ...state, products: newProducts };