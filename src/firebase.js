import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEEHpGggiV0ySagSAEKR99IHM_ewX1tM0",
  authDomain: "lightbulb-react.firebaseapp.com",
  projectId: "lightbulb-react",
  storageBucket: "lightbulb-react.appspot.com",
  messagingSenderId: "793618517123",
  appId: "1:793618517123:web:6497e507d14eb6f8d29fb6",
  measurementId: "G-26W06CH7H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
