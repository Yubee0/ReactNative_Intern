import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE } from '../actions/orderActions';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, orders: [...state.orders, action.payload] };
    case CREATE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default orderReducer;
