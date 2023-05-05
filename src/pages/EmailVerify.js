import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../firebase";
import { sendEmailVerification } from "firebase/auth";

const EmailVerify = () => {
  const { currentUser } = useContext(AuthContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [time, setTime] = useState(60);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeActive, time]);

  const resendEmailVerification = () => {
    setButtonDisabled(true);
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setButtonDisabled(false);
        setTimeActive(true);
      })
      .catch((err) => {
        alert(err.message);
        setButtonDisabled(false);
      });
  };

  return (
    <div className="grid place-items-center m-auto mt-20 justify-center items-center w-96 h-72 shadow-xl hover:shadow-2xl  ">
      <p className="text-center text-xl">
        Verification email has been sent to you{" "}
        <span className="font-bold">{currentUser?.email}</span>
      </p>
      <button
        onClick={resendEmailVerification}
        disabled={timeActive}
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-300"
      >
        Resend Email {timeActive && time}
      </button>
    </div>
  );
};

export default EmailVerify;
