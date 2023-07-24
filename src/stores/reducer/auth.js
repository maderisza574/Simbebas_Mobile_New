const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  message: '',
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING': {
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    }
    case 'LOGIN_FULFILLED': {
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        token: action.payload.data.data.token,
        refreshToken: action.payload.data.data.refreshToken,
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        errorMessage: action.payload.response.data.message,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default login;
