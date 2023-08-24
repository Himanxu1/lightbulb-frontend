import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import AddIdea from "./pages/AddIdea";
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

import { Analytics } from "@vercel/analytics/react";

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
    <>
      <Router>
        <AuthProvider value={{ currentUser }}>
          <UserProvider>
            <VouchProvider>
              <IdeasProvider>
                <div className="">
                  <div className="fixed w-full top-0 left-0 z-50 bg-white">
                    {/* {currentUser && <Navbar />} */}
                    <Navbar />
                  </div>
                  <div className="sm:mt-[72px] mt-[56px]">
                    {/* <Navbar/> */}
                    <Routes>
                      {/* <Route path="/" element={<Login />} /> */}
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/profile/:id" element={<Profile />} />
                      <Route path="/AddIdea" element={<AddIdea />} />
                      <Route path="/login" element={<Login />} />
                      {/* <Route path="/signup" element={<SignUp />} /> */}
                      <Route path="/community" element={<Community />} />
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/help" element={<Help />} />
                      <Route
                        path="/ideas/:ideaID"
                        element={<IdeaDescription />}
                      />
                    </Routes>
                  </div>
                </div>
              </IdeasProvider>
            </VouchProvider>
          </UserProvider>
        </AuthProvider>
      </Router>
      <Analytics />
    </>
  );
}

export default App;
