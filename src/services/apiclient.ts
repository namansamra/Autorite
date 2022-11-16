import { useGlobalStore } from '@/store/store';
import axios from 'axios';
import { userLogout } from './common';
import { API_BASE_URL } from './constants';

export const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL
    ? (import.meta.env.VITE_REACT_APP_API_URL as string)
    : API_BASE_URL,
  headers: {
    'x-api-key': 'LiTHO7PPfE1J0ReqBt7zP2wARtlu60G2RFEX59m3',
  },
});

const refreshToken = useGlobalStore?.getState()?.appState?.auth?.refresh?.token;
const resetStore = useGlobalStore?.getState()?.actions?.resetStore;

const handleLogout = async () => {
  try {
    await userLogout({ refreshToken });
    resetStore();
    localStorage.clear();
    window.location.replace('/login');
  } catch (error) {
    console.log(error);
    resetStore();
    localStorage.clear();
  }
  // } finally {
  //   resetStore();
  //   localStorage.clear();
  //   window.location.replace('/login');
  // }
};

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
          // if (data && data.hasOwnProperty('message')) {
          //   if (data.message === 'Token Expired') {
          //     window.location.replace('/login');
          //   }
          // }
          handleLogout();
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
