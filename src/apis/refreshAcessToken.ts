import { authAxiosInstance } from './axiosInstance';

export const refreshAccessToken = async () => {
  const getToken = window.localStorage.getItem('user')!;
  const refreshToken = JSON.parse(getToken).refreshToken;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  const path = `api/refresh?refreshToken=${refreshToken}`;
  const response = await authAxiosInstance.post(path, { headers });
  return response.data.content;
};
