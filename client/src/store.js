import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const history = createHistory();

const middlewares = [thunk, promise, routerMiddleware(history)];

export const store = createStore(
  reducers,
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : compose(applyMiddleware(...middlewares))
);
