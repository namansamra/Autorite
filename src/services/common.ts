import { api } from './apiclient';
import {
  USER_LOGIN,
  USER_SIGNUP,
  CREATE_ARTICLE,
  GET_ALL_ARTICLES,
  GET_DETAILED_ARTICLE,
  GET_LOCATIONS,
  CONNECT_WORDPRESS,
  GET_WORDPRESS_INFO,
  USER_LOGOUT,
  USER_VERIFY,
  SEND_VERIFICATION_EMAIL,
  SAVE_ARTICLE,
} from './constants';

export const userLogin = (body: any) => api.post(USER_LOGIN, body);
export const userSignUp = (body: any) => api.post(USER_SIGNUP, body);
export const userLogout = (body: any) => api.post(USER_LOGOUT, body);
export const createArticle = (body: any) => api.post(CREATE_ARTICLE, body);
export const getAllArticles = () => api.get(GET_ALL_ARTICLES);
export const getDetailedArticle = (id: string | number) =>
  api.get(GET_DETAILED_ARTICLE + id);

export const getLocations = (input = '') =>
  api.get(GET_LOCATIONS + (input ? `?query=${input}` : ''));

export const connectWordpress = (body: any) =>
  api.post(CONNECT_WORDPRESS, body);

export const getWordpressInfo = () => api.get(GET_WORDPRESS_INFO);
export const verifyUser = (token: string | null) =>
  api.post(`${USER_VERIFY}?token=${token}`);

export const sendVerificationEmail = () => api.post(SEND_VERIFICATION_EMAIL);

export const saveArticle = (body: any) => api.patch(SAVE_ARTICLE, body);
