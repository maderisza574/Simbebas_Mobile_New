import axios from '../../utils/axios';

export const getDataPusdalop = () => ({
  type: 'GET_PUSDALOP',
  payload: axios.get('/v1/pusdalops?page=1&perPage=30'),
});
export const getDataPusdalopById = (pusdalopid, config) => ({
  type: 'GET_PUSDALOP_BY_ID',
  payload: axios.get(`/v1/pusdalops/${pusdalopid}`, config),
});

export const createDataPusdalop = (dataPusdalop, config) => ({
  type: 'CREATE_PUSDALOP',
  payload: axios.post('/v1/pusdalops', dataPusdalop, config),
});

export const updateDataPusdalop = (dataUpdatePusdalop, config, pusdalopid) => ({
  type: 'UPDATE_PUSDALOP',
  payload: axios.patch(
    `/v1/pusdalops/${pusdalopid}`,
    dataUpdatePusdalop,
    config,
  ),
});

export const deleteDataPusdalop = (pusdalopId, config) => ({
  type: 'DELETE_PUSDALOP',
  payload: axios.delete(`/v1/pusdalops/${pusdalopId}`, config),
});
