import axios from 'axios';

export const boardAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BOARD_BASE_URL,
});
export const aladinAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ALADIN_URL,
});
