import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtSbcvCsTfj3w1ZoLaTte07wr3gnKG4Gg",
  authDomain: "everjam-1072a.firebaseapp.com",
  projectId: "everjam-1072a",
  storageBucket: "everjam-1072a.appspot.com",
  messagingSenderId: "98056718088",
  appId: "1:98056718088:web:83efb7d713f881be048ebd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
