import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"
import promise from "redux-promise-middleware";
import reducers from "./reducers";

const middlewares = [promise, thunk]

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));

