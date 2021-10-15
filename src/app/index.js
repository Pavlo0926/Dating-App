import React from "react";
import { Provider } from "react-redux";
import configureStore from "../redux/store";
import "../locale/i18n";
import App from "./app";

const AppContainer: () => React$Node = () => {
  const { store } = configureStore();

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppContainer;
