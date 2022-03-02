import axios from 'axios';
import config from './config.js';
const axiosService = axios.create(config);

axiosService.interceptors.request.use((config) => {
    // config.headers.Authorization= `Basic ${store.getters.name}:${getToken()}`;
    config.headers.AuthorizationToken= '123';
  return config;
}, (error) => {
  return Promise.reject(error);
});


export default axiosService;