export const ACCEPT_ORDER_REQUEST = 'ACCEPT_ORDER_REQUEST';
export const ACCEPT_ORDER_SUCCESS = 'ACCEPT_ORDER_SUCCESS';
export const ACCEPT_ORDER_FAILURE = 'ACCEPT_ORDER_FAILURE';

export const COMPLETE_ORDER_REQUEST = 'COMPLETE_ORDER_REQUEST';
export const COMPLETE_ORDER_SUCCESS = 'COMPLETE_ORDER_SUCCESS';
export const COMPLETE_ORDER_FAILURE = 'COMPLETE_ORDER_FAILURE';

export const acceptOrderRequest = (orderId) => ({
  type: ACCEPT_ORDER_REQUEST,
  payload: orderId,
});

export const acceptOrderSuccess = (order) => ({
  type: ACCEPT_ORDER_SUCCESS,
  payload: order,
});

export const acceptOrderFailure = (error) => ({
  type: ACCEPT_ORDER_FAILURE,
  payload: error,
});

export const completeOrderRequest = (orderId) => ({
  type: COMPLETE_ORDER_REQUEST,
  payload: orderId,
});

export const completeOrderSuccess = (order) => ({
  type: COMPLETE_ORDER_SUCCESS,
  payload: order,
});

export const completeOrderFailure = (error) => ({
  type: COMPLETE_ORDER_FAILURE,
  payload: error,
});
