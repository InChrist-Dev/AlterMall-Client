import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1x0GgnzrCTdojamOP4t6PlFde-mTzggE",
  authDomain: "altermall-99041.firebaseapp.com",
  projectId: "altermall-99041",
  storageBucket: "altermall-99041.appspot.com",
  messagingSenderId: "701620472802",
  appId: "1:701620472802:web:3a6a9b738b9b9b060347bb",
  measurementId: "G-E06QLNPH2W",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const storage = getStorage(app);
export { app, auth, storage, db };
