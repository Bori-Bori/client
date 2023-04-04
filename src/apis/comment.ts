import { appFireStore } from '../firebase/config';
import { collection, doc, getDoc } from 'firebase/firestore';

export const getComments = async (boardId: string) => {
  const collectionRef = collection(appFireStore, 'comments');
  const documentRef = doc(collectionRef, boardId);
  const docSnapshot = await getDoc(documentRef);
  const commentList = docSnapshot.data()?.commentList || [];
  const initialComments = commentList.slice(0, 10);
  const nextComments = commentList.slice(10);
  return { initialComments, nextComments };
};
