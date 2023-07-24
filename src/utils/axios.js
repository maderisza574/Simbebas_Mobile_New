import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {BASE_URL} from '@env';

const axiosApiIntances = axios.create({
  baseURL: 'https://apisimbebas.banyumaskab.go.id/api',
  // baseURL: 'http://10.10.16.189:5000/api',
});

// Add a request interceptor
axiosApiIntances.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const token = await AsyncStorage.getItem('token');
    // console.log('INI DATA AUTH', refreshToken, token);
    config.headers = {
      Authorization: `Bearer ${token}`,
      refreshtoken: refreshToken,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosApiIntances.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 403) {
      if (
        error.response.data.message ===
        'Please sign in again, your token is expired'
      ) {
        axiosApiIntances
          .post('/api/auth/refresh')
          .then(async res => {
            await AsyncStorage.setItem('token', res.data.data.token);
            await AsyncStorage.setItem(
              'refreshToken',
              res.data.data.refreshToken,
            );
          })
          .catch(async () => {
            await AsyncStorage.clear();
          });
      } else {
        await AsyncStorage.clear();
      }
    }
    return Promise.reject(error);
  },
);

export default axiosApiIntances;
