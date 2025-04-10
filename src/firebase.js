// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyC8e18otYhj2RRzflVW6bPsu4f4GFGPip0",
    authDomain: "achilles--ball.firebaseapp.com",
    projectId: "achilles--ball",
    storageBucket: "achilles--ball.firebasestorage.app",
    messagingSenderId: "1060318149121",
    appId: "1:1060318149121:web:e6e0a069cbee29dc865e00",
    measurementId: "G-QT028SCH4D"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
