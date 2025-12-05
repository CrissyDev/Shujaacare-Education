import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDcmqK6E0R8kHD50jSMVj1SQkihF847dcw",
  authDomain: "shujaacare-education.firebaseapp.com",
  projectId: "shujaacare-education",
  storageBucket: "shujaacare-education.appspot.com",
  messagingSenderId: "894881647030",
  appId: "1:894881647030:web:f4cc4c1212631e1de6d917",
  measurementId: "G-19D36RGJVJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;

