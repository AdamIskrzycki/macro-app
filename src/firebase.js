import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  //authDomain: "sklep-inz.firebaseapp.com",
  databaseURL: "https://macro-app-73387.firebaseio.com",
  projectId: "macro-app-73387",
  storageBucket: "sklep-inz.appspot.com",
  // using storage from sklep-inz because its no longer free to create new storages
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);