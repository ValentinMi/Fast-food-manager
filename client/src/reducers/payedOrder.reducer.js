const initState = {
  payedOrders: []
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
