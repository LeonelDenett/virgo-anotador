import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIVwg6AtATgmw_JUP3ixx9H5ReFM9Vw8A",
  authDomain: "virgo-anotador.firebaseapp.com",
  projectId: "virgo-anotador",
  storageBucket: "virgo-anotador.appspot.com",
  messagingSenderId: "581870367751",
  appId: "1:581870367751:web:2b7b070857393398dc66a2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Auth
export const auth = getAuth();