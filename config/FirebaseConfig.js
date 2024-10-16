// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pawtalk-745e3.firebaseapp.com",
  projectId: "pawtalk-745e3",
  storageBucket: "pawtalk-745e3.appspot.com",
  messagingSenderId: "943556032494",
  appId: "1:943556032494:web:937a9b1fcf5e43d91a40ff",
  measurementId: "G-QGEDYG3Y0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage=getStorage(app)
// const analytics = getAnalytics(app);