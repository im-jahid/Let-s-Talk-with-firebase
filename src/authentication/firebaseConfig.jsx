// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8zWwz8dkxbjSN0kbb1Y8aSesGHSMdMCM",
  authDomain: "let-s-talk-9c56b.firebaseapp.com",
  projectId: "let-s-talk-9c56b",
  storageBucket: "let-s-talk-9c56b.appspot.com",
  messagingSenderId: "548544496590",
  appId: "1:548544496590:web:d4414fa4291b9e117f619f",
  measurementId: "G-H52XLD448S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig