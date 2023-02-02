import { authAxios } from './axiosInstance';

export const getUserInfo = async () => {
  const getToken = window.localStorage.getItem('user')!;
  const accessToken = JSON.parse(getToken).accessToken;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await authAxios.get(`/api/member`, { headers });
  return response;
};
