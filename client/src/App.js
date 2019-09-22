import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./store";

import Main from "./pages/Main";

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Provider store={store}>
        <Main />
      </Provider>
    </Fragment>
  );
}

export default App;
