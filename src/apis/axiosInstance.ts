import axios from 'axios';

export const authAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_AUTH_BASE_URL,
  headers: {
    'Content-type': 'application/json',
    accecpt: 'application/json',
  },
});

export const boardAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BOARD_BASE_URL,
});
