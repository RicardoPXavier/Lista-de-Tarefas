// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDS3lBZ8AgCJqQbR0GnZeNK-k_IkeERxdE",
  authDomain: "to-list-1bdf8.firebaseapp.com",
  projectId: "to-list-1bdf8",
  storageBucket: "to-list-1bdf8.appspot.com",
  messagingSenderId: "9501434947",
  appId: "1:9501434947:web:b8e4b0becfc351de05a0f6",
  measurementId: "G-2YJ4S1NZCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);