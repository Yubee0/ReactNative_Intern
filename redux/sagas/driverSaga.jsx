import { takeEvery, call, put } from 'redux-saga/effects';
import { completeOrder } from '../../components/Api/driverServices'; 
import {
  ACCEPT_ORDER_REQUEST,
  acceptOrderSuccess,
  acceptOrderFailure,
  COMPLETE_ORDER_REQUEST,
  completeOrderSuccess,
  completeOrderFailure,
} from '../actions/driverActions';

// Handles the accept order action
function* handleAcceptOrder(action) {
  try {
    const orderId = action.payload;
    // Here, you can call a service if needed to update the backend about order acceptance
    yield put(acceptOrderSuccess({ id: orderId, status: 'accepted' })); // Update the status in Redux state
  } catch (error) {
    yield put(acceptOrderFailure(error.message));
  }
}

// Handles the complete order action
function* handleCompleteOrder(action) {
  try {
    const completedAt = new Date().toISOString();
    // Call the service to complete the order and return the updated order info
    const order = yield call(completeOrder, action.payload, completedAt); // Simulated API call
    yield put(completeOrderSuccess({ ...order, completedAt }));
  } catch (error) {
    yield put(completeOrderFailure(error.message));
  }
}

// Watcher saga for driver-related actions
function* watchDriverActions() {
  yield takeEvery(ACCEPT_ORDER_REQUEST, handleAcceptOrder); // Watch for accept order actions
  yield takeEvery(COMPLETE_ORDER_REQUEST, handleCompleteOrder); // Watch for complete order actions
}

export default watchDriverActions;
