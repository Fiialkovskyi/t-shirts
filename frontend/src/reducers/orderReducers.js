import {
  ADD_NEW_ORDER_REQUEST,
  ADD_NEW_ORDER_SUCCESS,
  ADD_NEW_ORDER_FAIL,
  LOAD_ORDERS_HISTORY_REQUEST,
  LOAD_ORDERS_HISTORY_SUCCESS,
  LOAD_ORDERS_HISTORY_FAIL,
} from '../constants/orderConstants';

export const orderReducer = (state = { ordersHistory: [], lastOrder: null }, action) => {
  switch (action.type) {
    case ADD_NEW_ORDER_REQUEST:
      return { ...state, loading: true, error: false };
    case ADD_NEW_ORDER_SUCCESS:
      return { ...state, loading: false, lastOrder: action.payload, error: false };
    case ADD_NEW_ORDER_FAIL:
      return { ...state, loading: false, error: true };
    case LOAD_ORDERS_HISTORY_REQUEST:
      return { ...state, loading: false, error: true };
    case LOAD_ORDERS_HISTORY_SUCCESS:
      return { ...state, loading: false, ordersHistory: action.payload, error: false };
    case LOAD_ORDERS_HISTORY_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
