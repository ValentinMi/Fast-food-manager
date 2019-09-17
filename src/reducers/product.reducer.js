import * as productConst from "../const/product.const";

const initState = {
  products: [
    {
      name: "Hamburger",
      price: 4,
      stock: 13
    },
    {
      name: "Hot-Dog",
      price: 2,
      stock: 10
    },
    {
      name: "Salade César",
      price: 5,
      stock: 8
    },
    {
      name: "Pizza",
      price: 10,
      stock: 7
    },
    {
      name: "Tacos",
      price: 7.5,
      stock: 4
    }
  ]
};

const productReducer = (state = initState, action) => {
  // Clone products
  let newProducts = [...state.products];

  // Destructure action
  const { type, payload } = action;

  switch (type) {
    // ADD NEW PRODUCT
    case productConst.ADD_PRODUCT:
      return { ...state, products: [...state.products, payload] };

    // REMOVE PRODUCT
    case productConst.REMOVE_PRODUCT:
      //  Reverse filter to remove a product
      newProducts = newProducts.filter(
        p => p !== state.products[payload.index]
      );
      return {
        ...state,
        products: newProducts
      };

    // REFOUND
    case productConst.REFOUND_PRODUCT:
      // Add selected value
      newProducts[payload.index].stock =
        newProducts[payload.index].stock + payload.selectValue;
      return {
        ...state,
        products: [...state.products]
      };
    default:
      return state;
  }
};

export default productReducer;
