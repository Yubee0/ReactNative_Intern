import { all } from 'redux-saga/effects';
import watchDriverActions from './driverSaga'; // Import your driver saga

// Root saga that combines all individual sagas
export default function* rootSaga() {
  yield all([
    watchDriverActions(), // Add the driver saga to the root saga
    // You can add more sagas here as needed
  ]);
}
