import { boardAxiosInstance } from './axiosInstance';

export const GetBoard = (boardId: string) => {
  return boardAxiosInstance.get(`/api/board/${boardId}`);
};
