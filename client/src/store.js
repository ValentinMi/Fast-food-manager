import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import localForage from "localforage";
import thunk from "redux-thunk"
import promise from "redux-promise-middleware";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares = [promise, thunk]

const persistConfig = {
  key: "root",
  storage: localForage,
  blacklist: []
};

export const store = createStore(
  persistReducer(persistConfig, reducers),
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : compose(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

