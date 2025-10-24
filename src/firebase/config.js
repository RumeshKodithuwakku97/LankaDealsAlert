import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVDF0irtQan_Lzo9cvBXQy3bbtJfVzFiQ",
  authDomain: "lankadealsalerts.firebaseapp.com",
  projectId: "lankadealsalerts",
  storageBucket: "lankadealsalerts.firebasestorage.app",
  messagingSenderId: "760571237579",
  appId: "1:760571237579:web:e376124cf7e8d09045f74e",
  measurementId: "G-SCPLDNXRC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);




export default app;