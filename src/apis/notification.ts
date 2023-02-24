import { authAxios } from './axiosInstance';

export const notifications = async () => {
  const getToken = window.localStorage.getItem('user')!;
  const accessToken = JSON.parse(getToken).accessToken;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await authAxios.get(`/api/member/notification`, { headers });
  return response;
};
