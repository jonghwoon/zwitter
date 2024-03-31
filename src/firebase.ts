import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrLAhx5WBasvKCOjra95zs1VZXs_tQU78",
  authDomain: "zwitter-reloaded.firebaseapp.com",
  projectId: "zwitter-reloaded",
  storageBucket: "zwitter-reloaded.appspot.com",
  messagingSenderId: "1009313506650",
  appId: "1:1009313506650:web:e04794cd12cd1962f83f63"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const storage = getStorage(app)

export const db = getFirestore(app)
