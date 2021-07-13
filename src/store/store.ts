import rootReducer from "reducers";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const Store = () =>
  createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(createLogger()))
  );

export default Store;
