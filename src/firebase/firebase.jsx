// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1bK3LprwTf2by6UEBfuO4W_gdk-s-6g0",
  authDomain: "e-commerce-website-a2022.firebaseapp.com",
  projectId: "e-commerce-website-a2022",
  storageBucket: "e-commerce-website-a2022.firebasestorage.app",
  messagingSenderId: "26411294437",
  appId: "1:26411294437:web:943d8b28761eeaa234be0c",
  measurementId: "G-ZWQJYCG37P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export {app,auth}