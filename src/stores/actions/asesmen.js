import axios from '../../utils/axios';

export const createDataAssesmen = () => ({
  type: 'CREATE_ASSESMEN',
  payload: axios.patch('/v1/assesment/:id'),
});
