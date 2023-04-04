import axios from 'axios';

export const aladinAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_ALADIN_URL,
});
