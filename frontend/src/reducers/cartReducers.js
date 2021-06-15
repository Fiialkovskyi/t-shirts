import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_LOAD_REQUEST,
  CART_LOAD_SUCCESS,
  CART_LOAD_FAIL,
  CART_CLEAR,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_LOAD_REQUEST:
      return { loading: true, cartItems: [], error: false };

    case CART_LOAD_SUCCESS:
      return { loading: false, cartItems: action.payload, error: false };

    case CART_LOAD_FAIL:
      return { loading: false, error: true };

    case CART_ADD_ITEM:
      return {
        ...state,
        cartItems: action.payload,
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: action.payload,
      };

    case CART_CLEAR: {
      return {
        ...state,
        cartItems: []
      }
    }
    default:
      return state;
  }
};
