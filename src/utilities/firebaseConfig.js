import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import {initializeApp} from "firebase/app";

import {databaseURL, apiKey} from "./config";

export const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "myquestions-460a1.firebaseapp.com",
  databaseURL: databaseURL,
  projectId: "myquestions-460a1",
  storageBucket: "myquestions-460a1.appspot.com",
  messagingSenderId: "1057006774935",
  appId: "1:1057006774935:web:d80fae5e77a82735cc17d2",
  measurementId: "G-SBP987KRH4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);

export {app, firebase};
