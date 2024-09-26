import { combineReducers } from 'redux';
import orderReducer from './orderReducer';
import driverReducer from './driverReducer';

const rootReducer = combineReducers({
  order: orderReducer,
  driver: driverReducer,
});

export default rootReducer;
