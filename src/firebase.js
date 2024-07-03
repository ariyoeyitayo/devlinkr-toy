// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAD6IQHcR4kYH738XrsYb6tPfDLtQciC4k",
  authDomain: "devlinkr-toy.firebaseapp.com",
  projectId: "devlinkr-toy",
  storageBucket: "devlinkr-toy.appspot.com",
  messagingSenderId: "480543198913",
  appId: "1:480543198913:web:695bbfc640cb4004408e40",
  measurementId: "G-SWBCG3RGPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
