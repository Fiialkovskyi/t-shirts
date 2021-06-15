import axios from 'axios';
import {
  ADD_NEW_ORDER_REQUEST,
  ADD_NEW_ORDER_SUCCESS,
  ADD_NEW_ORDER_FAIL,
  LOAD_ORDERS_HISTORY_REQUEST,
  LOAD_ORDERS_HISTORY_SUCCESS,
  LOAD_ORDERS_HISTORY_FAIL,
} from '../constants/orderConstants';

export const addNewOrder = (order) => async (dispatch) => {
  dispatch({ type: ADD_NEW_ORDER_REQUEST });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axios.post('/api/order/submit', order, config);
  if (data) {
    dispatch({ type: ADD_NEW_ORDER_SUCCESS, payload: data });
    await axios.get(`/api/cart/clear-cart/${order.id_user}`);
  } else {
    dispatch({ type: ADD_NEW_ORDER_FAIL });
  }
};

export const loadOrdersHistory = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_ORDERS_HISTORY_REQUEST });
  const { data } = await axios.get(`/api/order/history/${userId}`);
  if (data) {
    dispatch({
      type: LOAD_ORDERS_HISTORY_SUCCESS,
      payload: data,
    });
  } else {
    dispatch({ type: LOAD_ORDERS_HISTORY_FAIL });
  }
};
