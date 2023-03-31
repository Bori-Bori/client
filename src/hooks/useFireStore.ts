import { useReducer } from 'react';
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { appFireStore, formattedDate } from '../firebase/config';

interface State {
  document: any | null;
  isPending: boolean;
  error: string | null;
  success: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'isPending':
      return { isPending: true, document: null, success: false, error: null };
    case 'addDoc':
      return { isPending: false, document: action.payload, success: true, error: null };
    case 'error':
      return { isPending: false, document: null, success: false, error: action.payload };
    default:
      return state;
  }
};

export const useFirestore = (collectionName: string, documentName: string) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  // 컬렉션과 문서 참조
  const collectionRef = collection(appFireStore, collectionName);
  const documentRef = doc(collectionRef, documentName);
  const addOrUpdateDocument = async (data: any) => {
    dispatch({ type: 'isPending' });

    try {
      // Get the current document data
      const currentData = (await getDoc(documentRef)).data();
      const currentCommentList = currentData?.commentList || [];

      // Create the new data object with the required properties
      const newData = { ...data, date: formattedDate };

      // Create a new array by copying the previous array and adding the new data object
      const commentList = [...currentCommentList, newData];

      // Update the document data with the new array
      await setDoc(documentRef, { commentList }, { merge: true });

      dispatch({ type: 'addDoc', payload: commentList });
    } catch (error: any) {
      dispatch({ type: 'error', payload: error.message });
    }
  };

  return { addOrUpdateDocument, state };
};
