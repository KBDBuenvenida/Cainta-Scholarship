// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1F4HHyxotnYZVBtDuJkEQ_Qy9LO9cjyo",
  authDomain: "cainta-scholarship.firebaseapp.com",
  projectId: "cainta-scholarship",
  storageBucket: "cainta-scholarship.firebasestorage.app",
  messagingSenderId: "765085465395",
  appId: "1:765085465395:web:bac43bdafc54d825105c46",
  measurementId: "G-MK7V9RY6SN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);