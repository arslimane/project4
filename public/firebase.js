// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB92ojoKUrMWJZO2xvi9GmN3lPKtuoLANM",
  authDomain: "ezlive-3de45.firebaseapp.com",
  projectId: "ezlive-3de45",
  storageBucket: "ezlive-3de45.appspot.com",
  messagingSenderId: "307117333023",
  appId: "1:307117333023:web:0926177e6fe7e03f8bd32a",
  measurementId: "G-L3YF1HP60C"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

module.export =firebase;