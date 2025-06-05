import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvx2DdybzbwBwVrV26GgsrQb6aB3zh7Lg",
  authDomain: "moviemania-349b1.firebaseapp.com",
  projectId: "moviemania-349b1",
  storageBucket: "moviemania-349b1.firebasestorage.app",
  messagingSenderId: "361885803723",
  appId: "1:361885803723:web:a27196b5b74c0b669ca74e",
  measurementId: "G-7FTBF157FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage }; 