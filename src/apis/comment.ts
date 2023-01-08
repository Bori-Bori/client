import { boardAxiosInstance } from './axiosInstance';

type postCommentDataType = {
  content: string;
  page: string;
};

type getCommentDataType = {
  boardId: string;
  curSortState: boolean;
  size: number;
  bookPage: number;
  pageParam: number;
};

export const getComments = async ({ boardId, curSortState, size, bookPage, pageParam }: getCommentDataType) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const path = `/api/board/${boardId}/comment`;
  const params = { order: curSortState, page: pageParam, size, bookPage };

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

