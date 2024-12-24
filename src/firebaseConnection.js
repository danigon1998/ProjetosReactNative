// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZGhRhw0Rmcej634ADX2pBmhy36C3rqCg",
  authDomain: "devcurso-23d37.firebaseapp.com",
  projectId: "devcurso-23d37",
  storageBucket: "devcurso-23d37.firebasestorage.app",
  messagingSenderId: "176982448698",
  appId: "1:176982448698:web:43569469476198fab13303"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db, auth }