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
import Community from "./pages/Community";
import Explore from "./pages/Explore";
import Help from "./pages/Help";
import { IdeasProvider } from "../src/Context/IdeasContext";
import IdeaDescription from "./pages/IdeaDescription";
import { VouchProvider } from "./Context/VouchContext";
import { UserProvider } from "./Context/UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  //  console.log(currentUser?.photoURL)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, [currentUser]);

  // console.log(currentUser);
  return (
    <Router>
      <AuthProvider value={{ currentUser }}>
        <UserProvider>
          <VouchProvider>
            {currentUser && <Navbar />}
            <IdeasProvider>
              {/* <Navbar/> */}
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/landingpage' element={<LandingPage />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/login' element={<Login />} />
                {/* <Route path="/signup" element={<SignUp />} /> */}
                <Route path='/community' element={<Community />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/help' element={<Help />} />
                <Route path='/ideas/:ideaID' element={<IdeaDescription />} />
              </Routes>
            </IdeasProvider>
          </VouchProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
