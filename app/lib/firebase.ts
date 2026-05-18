
import { initializeApp } from "firebase/app";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD79HzTi8o5OSPghLQyyJjpCpG01xmmCqg",
  authDomain: "pasi-admin.firebaseapp.com",
  projectId: "pasi-admin",
  storageBucket: "pasi-admin.firebasestorage.app",
  messagingSenderId: "1092703906706",
  appId: "1:1092703906706:web:028e7ab36c067fe170ef4b",
  measurementId: "G-5M2Q8EQBYH",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);