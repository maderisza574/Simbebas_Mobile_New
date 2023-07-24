import axios from '../../utils/axios';

export const login = data => {
  return {
    type: 'LOGIN',
    payload: axios.post('/v1/login/', data),
  };
};
