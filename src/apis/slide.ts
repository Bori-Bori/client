import { boardAxiosInstance } from './axiosInstance';

export const GetBookInfo = (boardId: string | undefined) => {
  return boardAxiosInstance.get(`/api/board/${boardId}`);
};
