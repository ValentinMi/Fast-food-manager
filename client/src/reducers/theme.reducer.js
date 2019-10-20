const initState = {
  appName: "Fast food manager"
};

const themeReducer = (state = initState, action) => {
  // Destructure action
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};

export default themeReducer;
