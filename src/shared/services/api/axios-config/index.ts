import axios from 'axios';

import { responseInterceptor, errorInterceptor } from './interceptors';

export const Api = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('APP_ACCESS_TOKEN') || '""')}`
    }
  });

  api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
  );

  return api;
};
