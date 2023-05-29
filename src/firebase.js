import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnAhjI6xwBtMiJrTFS3kHh_OPSWEeK4yg",
  authDomain: "lightbulb-frontend.vercel.app",
  projectId: "authentication-911d8",
  storageBucket: "authentication-911d8.appspot.com",
  messagingSenderId: "331974360309",
  appId: "1:331974360309:web:1845df063c4c4bbfb919bc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
