// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, Timestamp } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const appFireStore = getFirestore(app);
const timestamp = Timestamp.now(); // 예시로 현재 타임스탬프를 사용합니다.
const dateObject = timestamp.toDate();
const year = dateObject.getFullYear();
const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
const date = ('0' + dateObject.getDate()).slice(-2);
const hours = ('0' + dateObject.getHours()).slice(-2);
const minutes = ('0' + dateObject.getMinutes()).slice(-2);
const formattedDate = `${year}.${month}.${date} ${hours}:${minutes}`;
export { app, auth, appFireStore, formattedDate };
