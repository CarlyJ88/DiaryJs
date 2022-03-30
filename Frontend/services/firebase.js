// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { navigateTo } from "../routing";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARnUBTxm8ybrCwrPQydcjl0vCCqCqnHHU",
  authDomain: "dairy-8f02f.firebaseapp.com",
  projectId: "dairy-8f02f",
  storageBucket: "dairy-8f02f.appspot.com",
  messagingSenderId: "849944319015",
  appId: "1:849944319015:web:385940fa0740757649ea02",
  measurementId: "G-GNY2RNZJ92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// import firebase from "firebase/compat/app";
// import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export function redirect() {
  const auth = getAuth();
  signInWithRedirect(auth, provider);
  // onAuthStateChanged();
}

export async function user() {
  const auth = getAuth();
  try {
    const result = await getRedirectResult(auth);
    console.log("1", result, "result");
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result); // fail
    console.log("2");
    const token = credential.accessToken;
    console.log("3");
    console.log("token:", token);
    // The signed-in user info.
    const user = result.user;
    console.log("user:", user);
    return user;
  } catch (error) {
    console.log(error, "error");
    redirect();
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential_1 = GoogleAuthProvider.credentialFromError(error);
  }
}

// onAuthStateChanged(getAuth(), (user) => {
//   if (user) {
//     // navigateTo(`/calendar`);
//     console.log(user, "user in firebase");
//     // User is signed in, see docs for a list of avasilable properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     console.log("User is signed out in firebase");
//     // navigateTo(`/login`);
//     // redirect();
//   }
// });
