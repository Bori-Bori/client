import axios from 'axios';
import { refreshAccessToken } from './refreshAcessToken';
export const authAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_AUTH_BASE_URL,
  headers: {
    'Content-type': 'application/json',
    Accecpt: 'application/json',
  },
});

export const boardAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BOARD_BASE_URL,
});

authAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('401');
      try {
        originalRequest._retry = true;
        const { id, accessToken, refreshToken, nickname } = await refreshAccessToken();
        console.log(id, accessToken, refreshToken, nickname);
        window.localStorage.setItem('user', JSON.stringify({ id, accessToken, refreshToken, nickname }));
        authAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return authAxiosInstance(originalRequest);
      } catch (error) {
        localStorage.clear();
        window.location.href = '/';
        alert('다시 로그인 해주세요.');
      }
    }
    return Promise.reject(error);
  },
);

boardAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('401');
      try {
        originalRequest._retry = true;
        const { id, accessToken, refreshToken, nickname } = await refreshAccessToken();
        console.log(id, accessToken, refreshToken, nickname);
        window.localStorage.setItem('user', JSON.stringify({ id, accessToken, refreshToken, nickname }));
        authAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return authAxiosInstance(originalRequest);
      } catch (error) {
        localStorage.clear();
        window.location.href = '/';
        alert('다시 로그인 해주세요.');
      }
    }
    return Promise.reject(error);
  },
);
