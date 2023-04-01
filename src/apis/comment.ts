import { appFireStore } from '../firebase/config';
import { boardAxiosInstance } from './axiosInstance';
import { collection, doc, getDoc } from 'firebase/firestore';

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

export const getComments = async (boardId: string) => {
  const collectionRef = collection(appFireStore, 'comments');
  const documentRef = doc(collectionRef, boardId);
  const docSnapshot = await getDoc(documentRef);
  const commentList = docSnapshot.data()?.commentList || [];
  const initialComments = commentList.slice(0, 10);
  const nextComments = commentList.slice(10);
  return { initialComments, nextComments };
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
