// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9oXa7VsyICvv2EXbN2EeDK83YPuy9Ois",
  authDomain: "carbon-project-fa8e2.firebaseapp.com",
  projectId: "carbon-project-fa8e2",
  storageBucket: "carbon-project-fa8e2.appspot.com",
  messagingSenderId: "789260833901",
  appId: "1:789260833901:web:8fe7f23b622d0403a61b64",
  measurementId: "G-1DRC082CDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);