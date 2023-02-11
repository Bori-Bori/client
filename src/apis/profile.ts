import { authAxiosInstance } from './axiosInstance';

type postProfileDataType = {
  id: string;
  imagePath: string;
};

export const postProfile = async (data: postProfileDataType) => {
  const path = `/api/member/image`;
  const getToken = window.localStorage.getItem('user')!;
  const accessToken = JSON.parse(getToken).accessToken;
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
  };
  const response = await authAxiosInstance.post(path, JSON.stringify(data), { headers });
  return response.data;
};
