import axios from 'axios';

const BASE_URL = 'http://localhost:5189';

const axiosIns = axios.create({
  baseURL: BASE_URL,
});

axiosIns.interceptors.request.use(
  (config) => {
    // config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosIns;
