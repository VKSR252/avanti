// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC260nMUcB97Jn8HlCBuQWQCHIMjUznLrA",
  authDomain: "analytics-avanti.firebaseapp.com",
  projectId: "analytics-avanti",
  storageBucket: "analytics-avanti.firebasestorage.app",
  messagingSenderId: "482651540319",
  appId: "1:482651540319:web:48588c446c191d539584ea",
  measurementId: "G-Y523N5HYC3"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const auth = getAuth(app);
// 🔒 Ensure session persists
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to local.");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { db,auth };