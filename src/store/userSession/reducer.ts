import {LOGIN_STATUS} from './actionTypes';
import {LoginActionTypes} from './types';

const initialUserSessionState = {
  loginStatus: {
    isLoading: true,
    userToken: null,
  },
};

export default (state = initialUserSessionState, action: LoginActionTypes) => {
  switch (action.type) {
    case LOGIN_STATUS: {
      return {
        ...state,
        loginStatus: {
          ...state.loginStatus,
          isLoading: action.payload.isLoading,
          userToken: action.payload.userToken,
        },
      };
    }
    default:
      return state;
  }
};
