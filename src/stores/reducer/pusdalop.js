const initialState = {
  data: [],
  isLoading: false,
  errorMessage: null,
};

const pusdalopReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PUSDALOP_PENDING':
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    case 'GET_PUSDALOP_FULFILLED':
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        data: action.payload.data?.rows,
      };
    case 'GET_PUSDALOP_REJECTED':
      return {
        ...state,
        errorMessage: 'GAGAL',
        isLoading: false,
      };
    case 'GET_PUSDALOP_BY_ID_PENDING':
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    case 'GET_PUSDALOP_BY_ID_FULFILLED':
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        data: action.payload.data.data,
      };
    case 'GET_PUSDALOP_BY_ID_REJECTED':
      return {
        ...state,
        errorMessage: 'GAGAL',
        isLoading: false,
      };
    case 'CREATE_PUSDALOP_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case 'CREATE_PUSDALOP_FULFILLED': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: 'SUKSES',
      };
    }
    case 'CREATE_PUSDALOP_REJECTED': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: 'GAGAL',
      };
    }
    case 'UPDATE_PUSDALOP_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case 'UPDATE_PUSDALOP_FULFILLED': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: 'SUKSES',
      };
    }
    case 'UPDATE_PUSDALOP_REJECTED': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: 'GAGAl',
      };
    }
    case 'DELETE_PUSDALOP_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case 'DELETE_PUSDALOP_FULFILLED': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: 'SUKSES',
      };
    }
    case 'DELETE_PUSDALOP_REJECTED': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: 'GAGAL',
      };
    }
    default: {
      return state;
    }
  }
};

export default pusdalopReducer;
