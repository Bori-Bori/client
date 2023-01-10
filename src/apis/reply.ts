import { boardAxiosInstance } from './axiosInstance';

type postReplyDataType = {
  content: string;
};

export const getReply = async (commentId: string, size: number, page: number) => {
  const path = `/api/comment/${commentId}/reply`;
  const params = { size, page };
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const response = await boardAxiosInstance.get(path, { params, headers });
  return response;
};

export const postReply = async (commentId: string, data: postReplyDataType) => {
  const path = `/api/comment/${commentId}/reply`;
  const getToken = window.localStorage.getItem('user')!;
  const accessToken = JSON.parse(getToken).accessToken;
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
  };
  const response = await boardAxiosInstance.post(path, data, { headers });
  return response;
};
