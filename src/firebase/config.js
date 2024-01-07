import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC9jNSxV8RF3HfY3zcUKLBzQXMuXHiq8bg",
  authDomain: "ionic-todo-app-45f8a.firebaseapp.com",
  projectId: "ionic-todo-app-45f8a",
  storageBucket: "ionic-todo-app-45f8a.appspot.com",
  messagingSenderId: "673209485657",
  appId: "1:673209485657:web:82a62e587b2a4ef359e448"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Authenticate = getAuth(app)
const Store = getFirestore(app)

export {
    Authenticate,
    Store
}
