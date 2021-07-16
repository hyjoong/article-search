import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Routes from "Routes";
import Store from "store/configureStore";

const store = Store();

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
