import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCES,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCES,
  USER_REGISTER_FAIL,
  USER_REGISTER_LOGOUT
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCES:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL: {
      return { loading: false, error: action.payload };
    }
    case USER_LOGOUT: {
      return {};
    }
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, error: false };
    case USER_REGISTER_SUCCES:
      return { loading: false, userInfo: action.payload, error: false };
    case USER_REGISTER_FAIL: {
      return { loading: false, error: action.payload };
    }
    case USER_REGISTER_LOGOUT: {
      return {}
    }
    default:
      return state;
  }
};
