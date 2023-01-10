import { boardAxiosInstance } from './axiosInstance';

export const getBoard = (boardId: string) => {
  return boardAxiosInstance.get(`/api/board/${boardId}`);
};
