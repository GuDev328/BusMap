import { message } from 'antd';
import axios from 'axios';

const BASE_URL = 'http://localhost:5189';

const axiosIns = axios.create({
  baseURL: BASE_URL,
});

axiosIns.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosIns.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    message.error(error.response.data);
    if (
      error.response.status === 401 &&
      window.location.pathname !== '/auth/signin'
    ) {
      localStorage.removeItem('token');
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

export default axiosIns;
