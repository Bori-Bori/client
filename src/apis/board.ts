import { boardAxiosInstance } from './axiosInstance';

type BookISBN = {
  bookISBN: string;
};
export const GetBoard = (boardId: BookISBN) => {
  return boardAxiosInstance.get(`/api/board/${boardId.bookISBN}`);
};
