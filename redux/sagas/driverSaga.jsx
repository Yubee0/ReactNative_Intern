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

function* handleAcceptOrder(action) {
  try {
    const orderId = action.payload;
    yield put(acceptOrderSuccess({ id: orderId, status: 'accepted' }));
  } catch (error) {
    yield put(acceptOrderFailure(error.message));
  }
}

function* handleCompleteOrder(action) {
  try {
    const completedAt = new Date().toISOString();
    const order = yield call(completeOrder, action.payload, completedAt); 
    yield put(completeOrderSuccess({ ...order, completedAt }));
  } catch (error) {
    yield put(completeOrderFailure(error.message));
  }
}

function* watchDriverActions() {
  yield takeEvery(ACCEPT_ORDER_REQUEST, handleAcceptOrder); 
  yield takeEvery(COMPLETE_ORDER_REQUEST, handleCompleteOrder); 
}

export default watchDriverActions;
