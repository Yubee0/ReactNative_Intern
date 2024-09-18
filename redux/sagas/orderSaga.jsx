import { takeEvery, call, put } from 'redux-saga/effects';
import { createOrder } from '../../components/Api/orderServices'; 
import { CREATE_ORDER_REQUEST, createOrderSuccess, createOrderFailure } from '../actions/orderActions';

function* createOrderSaga(action) {
  try {
    const order = yield call(createOrder, action.payload); 
    yield put(createOrderSuccess(order));
  } catch (error) {
    console.log('Order creation failed:', error);
    yield put(createOrderFailure(error.message));
  }
}

function* watchCreateOrder() {
  yield takeEvery(CREATE_ORDER_REQUEST, createOrderSaga);
}

export default watchCreateOrder;
