import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthContext, AuthProvider } from "./Context/AuthContext";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import EmailVerify from "./pages/EmailVerify";
import Community from "./pages/Community";
import Explore from "./pages/Explore";
import Help from "./pages/Help";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  console.log(currentUser);
  return (
    <Router>
      {currentUser && <Navbar />}
      <AuthProvider value={{ currentUser }}>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/community" element={<Community />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/help" element={<Help/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
