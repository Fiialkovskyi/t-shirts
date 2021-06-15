import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCES,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCES,
} from '../constants/userConstants';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { user_email: email, user_password: password },
      config
    );

    if (data.error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: data.errorMesage,
      });
      dispatch({ type: USER_REGISTER_LOGOUT });
    } else {
      dispatch({
        type: USER_LOGIN_SUCCES,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_REGISTER_LOGOUT });
};

export const register = (fullName, phoneNumber, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users',
      {
        user_full_name: fullName,
        user_phone_number: phoneNumber,
        user_email: email,
        user_password: password,
      },
      config
    );

    if (data.error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: data.errorMesage,
      });
      dispatch({ type: USER_LOGOUT });
    } else {
      dispatch({
        type: USER_REGISTER_SUCCES,
        payload: data,
      });

      dispatch({
        type: USER_REGISTER_LOGOUT,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: USER_LOGOUT });
  }
};
