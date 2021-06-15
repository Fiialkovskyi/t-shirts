import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_LOAD_REQUEST,
  CART_LOAD_SUCCESS,
  CART_LOAD_FAIL,
  CART_CLEAR,
} from '../constants/cartConstants';

export const loadCart = (userId) => async (dispatch) => {
  try {
    dispatch({ type: CART_LOAD_REQUEST });
    const { data } = await axios.get(`/api/cart/load-cart/${userId}`);
    dispatch({
      type: CART_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_LOAD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addToCart =
  ({ id_color, id_size, id_type, id_product, id_user }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = {
      id_color,
      id_size,
      id_type,
      id_product,
      id_user,
    };

    const { data } = await axios.post('/api/cart/add', body, config);

    dispatch({
      type: CART_ADD_ITEM,
      payload: data,
    });
  };

export const removeItemFromCart = (idCartItem) => async (dispatch) => {
  const { data } = await axios.get(`/api/cart/delete/${idCartItem}`);

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: data,
  });
};

export const clearCart = (userId) => async (dispatch) => {
  await axios.get(`/api/cart/clear-cart/${userId}`);
  dispatch({ type: CART_CLEAR });
};
