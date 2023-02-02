import { authAxiosInstance } from './axiosInstance';

export const notifications = async () => {
  const getToken = window.localStorage.getItem('user')!;
  const Token = JSON.parse(getToken).accessToken || JSON.parse(getToken).refreshToken;
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Bearer ${Token}`,
    Accept: 'application/json',
  };
  const response = await authAxiosInstance.get(`/api/member/notification`, { headers });
  return response;
};
