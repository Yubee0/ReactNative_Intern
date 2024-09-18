import { all } from 'redux-saga/effects';
import watchCreateOrder from './orderSaga';

export default function* rootSaga() {
  yield all([watchCreateOrder()]);
}
