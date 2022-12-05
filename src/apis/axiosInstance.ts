import axios from 'axios';

export const authAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_AUTH_BASE_URL,
});

export const boardAxiosInstance = axios.create({
  baseURL: 'http://54.180.143.136/',
});
