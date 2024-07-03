import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "mychat-b32e2.firebaseapp.com",
  projectId: "mychat-b32e2",
  storageBucket: "mychat-b32e2.appspot.com",
  messagingSenderId: "984977547633",
  appId: "1:984977547633:web:f4404fdf46b189c7f516d0",
  measurementId: "G-8YFCKBZH17",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const firebaseAuth = getAuth(app);

export { ref, set, onValue, push };
