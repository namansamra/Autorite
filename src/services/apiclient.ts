import { useGlobalStore } from '@/store/store';
import axios from 'axios';
import { API_BASE_URL } from './constants';

export const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL
    ? (import.meta.env.VITE_REACT_APP_API_URL as string)
    : API_BASE_URL,
  headers: {
    'x-api-key': 'LiTHO7PPfE1J0ReqBt7zP2wARtlu60G2RFEX59m3',
  },
});

api.interceptors.request.use((config: any) => {
  const token = useGlobalStore?.getState()?.appState?.auth?.access?.token;
  if (token) config.headers.Authorization = token;
  return config;
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          if (data && data.hasOwnProperty('message')) {
            if (data.message === 'Token Expired') {
              window.location.replace('/login');
            }
          }
          break;

        default:
          break;
      }
    } else {
      error.response = {
        status: '504',
        data: {
          message: 'Network error',
        },
      };
    }
    return Promise.reject(error);
  }
);
