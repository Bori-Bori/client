import axios from 'axios';

export const aladinAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ALADIN_URL,
});
export const kakaoAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_URL,
});
