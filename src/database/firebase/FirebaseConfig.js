import firebase from "firebase/app";
import "firebase/firebase-auth";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(config);

export const auth = firebase.auth();