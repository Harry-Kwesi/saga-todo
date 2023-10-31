// store.js

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import tasksSaga from "./taskSaga";
import tasksReducer from "./taskreducer";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(tasksReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(tasksSaga);

export default store;
