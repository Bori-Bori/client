import { boardAxiosInstance } from './axiosInstance';

export const getComments = async (boardId: number, order: boolean, size: number, offset: number, pageNum?: number) => {
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
