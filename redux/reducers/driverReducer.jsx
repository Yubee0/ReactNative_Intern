import { ACCEPT_ORDER_REQUEST, ACCEPT_ORDER_SUCCESS, ACCEPT_ORDER_FAILURE,
   COMPLETE_ORDER_REQUEST,  COMPLETE_ORDER_SUCCESS, COMPLETE_ORDER_FAILURE} from '../actions/driverActions';

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

const driverReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload,
      };
    case ACCEPT_ORDER_REQUEST:
    case COMPLETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACCEPT_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? { ...order, status: 'accepted' } : order
        ),
      };
    case COMPLETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? { ...order, status: 'completed', completedAt: action.payload.completedAt } : order
        ),
      };
    case ACCEPT_ORDER_FAILURE:
    case COMPLETE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default driverReducer;
