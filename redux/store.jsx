import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';  // Combined reducers
import rootSaga from './sagas';        // Root saga

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Set up Redux DevTools extension if available, else use regular compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store, applying saga middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)) // Apply saga middleware
);

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
