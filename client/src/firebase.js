// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-2c493.firebaseapp.com",
  projectId: "mern-auth-2c493",
  storageBucket: "mern-auth-2c493.appspot.com",
  messagingSenderId: "181931583508",
  appId: "1:181931583508:web:b758c9f99a59d5f0171f01"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);