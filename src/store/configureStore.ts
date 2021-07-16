import rootReducer from "reducers";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const ConfigureStore = () =>
  createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(createLogger()))
  );

export default ConfigureStore;
