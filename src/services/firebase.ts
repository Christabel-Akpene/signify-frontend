import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApIXuZr_UvBdLbWcoGM9BafEU4eWRK5rk",
  authDomain: "hestia-signify.firebaseapp.com",
  projectId: "hestia-signify",
  storageBucket: "hestia-signify.firebasestorage.app",
  messagingSenderId: "850863736589",
  appId: "1:850863736589:web:e288ca8a5c65e7574a5244",
  measurementId: "G-CNJNZHHCQ2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
