import { boardAxiosInstance } from './axiosInstance';

type postCommentDataType = {
  content: string;
  page: string;
};

type getCommentDataType = {
  boardId: string;
  searchOrder: string;
  size: number;
  bookPage: number | undefined;
  pageParam: number;
};

export const getComments = async ({ boardId, searchOrder, size, bookPage, pageParam }: getCommentDataType) => {
  const path = `/api/board/${boardId}/comment`;
  const params = { order: searchOrder, page: pageParam, size, bookPage };
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  const response = await boardAxiosInstance.get(path, { params, headers });
  const { items, isLast } = response.data.content;
  return { items, isLast, nextPage: pageParam };
};

export const postComments = async (boardId: string, data: postCommentDataType) => {
  const path = `/api/board/${boardId}/comment`;
  const getToken = window.localStorage.getItem('user')!;
  const accessToken = JSON.parse(getToken).accessToken;
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `Bearer ${accessToken}`,
    Accept: '*/*',
  };
  const response = await boardAxiosInstance.post(path, data, { headers });
  return response;
};
