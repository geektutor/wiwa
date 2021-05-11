import firebase from "firebase/app";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  appId: process.env.REACT_APP_APP_ID,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "wiwa-68434.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

// Get a reference to the storage service, export it for use
export const storage = firebase.storage();

export default firebaseApp;
