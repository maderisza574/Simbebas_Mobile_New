const initialState = {
  data: [],
  isLoading: false,
  errorMessage: null,
};

const assesmenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ASSESMEN_PENDING':
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    case 'CREATE_ASSESMEN_FULFILLED':
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        data: action.payload.data,
      };
    case 'CREATE_ASSESMEN_REJECTED':
      return {
        ...state,
        errorMessage: 'GAGAL',
        isLoading: false,
      };
    default: {
      return state;
    }
  }
};
export default assesmenReducer;
