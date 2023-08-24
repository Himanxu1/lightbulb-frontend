import React, { useContext } from "react";
import img from "../assets/Cactus 2 by Streamlinehq.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const base_url = process.env.REACT_APP_BACKEND_URL;

  const signinwithgoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        const result = user.filter((item) => {
          return item.userId === res.user.uid;
        });
        console.log(result.length);
        if (result.length === 0) {
          axios
            .post(`${base_url}/api/auth/register`, {
              photoUrl: res.user.photoURL,
              userId: res.user.uid,
              name: res.user.displayName,
              email: res.user.email,
              bio: "Hey there fellow entrepreneurs.",
            })
            .then((res) => {
              console.log("user added");
            })
            .catch((err) => {
              console.log(err);
            });
        }
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center items-cente">
          <h1 className="myFont font-bold text-[25px] mr-4 ">Litebulb</h1>
          <img className=" h-10 w-auto" src={img} alt="Your Company" />
        </div>
        <h2 className="myFont mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 mx-auto sm:w-full sm:max-w-sm">
        <div className="flex flex-col justify-center">
          <button
            aria-label="Continue with google"
            role="button"
            className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-2 px-4 border rounded-lg border-gray-700 flex items-center w-72 mx-auto justify-center mt-4"
          >
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg"
              alt="google"
            />
            <p
              class="myFont text-base font-medium ml-4 text-gray-700"
              onClick={signinwithgoogle}
            >
              Continue with Google
            </p>
          </button>
          <button className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-2 px-4 border rounded-lg border-gray-700 flex items-center w-72 mx-auto justify-center mt-4">
            <p
              class="myFont text-base font-medium text-gray-700"
              onClick={() => navigate("/")}
            >
              Skip for now
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
