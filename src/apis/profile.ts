import { appFireStore } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export const getProfile = async (uid: string) => {
  const docRef = doc(appFireStore, 'userInfo', uid);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    return docSnapshot.data();
  } else {
    return null;
  }
};
