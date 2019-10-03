const initState = {
  payedOrders: [
    [
      {
        products: {
          name: "Hamb",
          quantity: 3,
          price: 10
        },
        totalPrice: 10,
        date: new Date()
      }
    ]
  ]
};

const payedOrderReducer = (state = initState, action) => {
  // Destructure action
  const { type, payload } = action;

  switch (type) {
    case "test":
      break;

    default:
      return state;
  }
};

export default payedOrderReducer;
