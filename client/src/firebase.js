import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEa8zPQCVx1sZVPovMhJwP75QwgM1DhMw",
  authDomain: "edutime-eefeb.firebaseapp.com",
  projectId: "edutime-eefeb",
  storageBucket: "edutime-eefeb.appspot.com",
  messagingSenderId: "878696656992",
  appId: "1:878696656992:web:b8928ad667f24546cd5305",
  measurementId: "G-ETS7L8KKG3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
