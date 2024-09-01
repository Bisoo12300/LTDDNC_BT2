// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAseaImB-jVEo2Ct1q5ftW_-jrebVdh1k",
  authDomain: "btt2-67904.firebaseapp.com",
  projectId: "btt2-67904",
  storageBucket: "btt2-67904.appspot.com",
  messagingSenderId: "667942470660",
  appId: "1:667942470660:web:ea69c09acbd007f63c2151"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

