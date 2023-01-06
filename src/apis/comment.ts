import { boardAxiosInstance } from './axiosInstance';

type commentDataType = {
  content: string;
  page: string;
};
export const postComments = async (boardId: string, data: commentDataType) => {
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

export const getComments = async (boardId: string, order: boolean, size: number, offset: number, pageNum?: number) => {
  if (order === true) {
    const response = await boardAxiosInstance.get(
      `/api/board/reply/${boardId}?order=recent&size=${size}&offset=${offset}`,
    );
    return response.data;
  }

  const response = await boardAxiosInstance.get(
    `/api/board/reply/${boardId}?order=page&page-num=${pageNum}&size=${size}&offset=${offset}`,
  );
  return response.data;
};

// export const getComments =async (boardId: string, order: string, page: string, size: string, bookPage: string) => {
//   return boardAxiosInstance.get(`api/board/${boardId}/comment?order=${order}`)
// }
