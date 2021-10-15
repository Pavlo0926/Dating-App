import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import createSagaMiddleware from "redux-saga";
// import logger from "redux-logger";
import { eventBusMiddleware } from "../middlewares";
import { rootSaga } from "../sagas";

export default function configureStore(initialState) {
  const middlewares = [];
  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);
  // middlewares.push(logger);
  middlewares.push(eventBusMiddleware);

  let store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares)),
  );
  global.store = store;

  sagaMiddleware.run(rootSaga);

  return { store };
}
