import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPen } from "react-icons/bs";
import { IoBuildOutline } from "react-icons/io5";
import { IoBulbOutline } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import VouchedCard from "../components/VouchedCard/VouchedCard";
import BuildCard from "../components/BuildCard/BuildCard";
import CreatedCard from "../components/CreatedCard/CreatedCard";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import BioModal from "../components/BioModal/BioModal";
import axios from "axios";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [currentComponent, setCurrentComponent] = useState("vouched");
  const [bio, setBio] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const handleClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  let currentRenderedComponent = null;
  if (currentComponent === "vouched") {
    currentRenderedComponent = <VouchedCard />;
  } else if (currentComponent === "created") {
    currentRenderedComponent = <CreatedCard />;
  } else if (currentComponent === "build") {
    currentRenderedComponent = <BuildCard />;
  }

  const logout = () => {
    signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get(`${base_url}/api/auth?userId=${currentUser?.uid}`)
      .then((res) => {
        setBio(res.data.data[0].bio);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const editBio = () => {
    setShow(!show);
  };

  return (
    <div className='relative md:mt-20 sm:mt-10 mt-0 md:mx-12 sm:mx-8 mx-4'>
      <div className='grid place-items-center'>
        <img
          src={currentUser?.photoURL}
          className='sm:w-28 w-22 sm:h-28 h-22 sm:mt-2 mt-14 rounded-xl '
        />
        <div className=' flex space-x-4 sm:text-lg text-base my-4'>
          <button
            className=' mt-2 p-2 border border-violet-400 rounded-xl hover:bg-violet-500 hover:text-white'
            onClick={logout}
          >
            Signout
          </button>
          <button
            className=' mt-2 p-2 border border-violet-400 rounded-xl hover:bg-violet-500 hover:text-white'
            onClick={editBio}
          >
            Edit Bio
          </button>
          {show && (
            <div className='bg-gray-200'>
              <div className='absolute left-[1%] right-[1%]'>
                <BioModal
                  id={currentUser?.uid}
                  show={show}
                  setBio={setBio}
                  setShow={setShow}
                />
              </div>
            </div>
          )}
        </div>
        <h1 className='font-bold sm:text-xl text-lg sm:mt-4 mt-2'>
          @{currentUser?.displayName}
        </h1>
        <p className='text-center sm:text-xl text-lg sm:mt-4 mt-2 text-[18px]'>
          {bio}
        </p>
      </div>
      <div className='flex justify-around sm:mt-14 mt-10 md:font-medium md:text-lg text-base '>
        <Link
          // className='flex items-center text-gray-400'
          className={`flex items-center  ${
            currentComponent === "vouched" ? "" : "text-gray-400"
          }`}
          onClick={() => handleClick("vouched")}
        >
          <h1 className='mr-2 ml-4'>Vouched</h1>
          <IoBulbOutline className='text-[22px]' />
        </Link>
        <Link
          className={`flex items-center  ${
            currentComponent === "created" ? "" : "text-gray-400"
          }`}
          onClick={() => handleClick("created")}
        >
          <h1 className=''>Created</h1>
          <BsPen className='ml-2' />
        </Link>
        <Link
          className={`flex items-center  ${
            currentComponent === "build" ? "" : "text-gray-400"
          }`}
          onClick={() => handleClick("build")}
        >
          <h1 className='mr-2'>Build</h1>
          <IoBuildOutline className='' />
        </Link>
      </div>
      <div className='h-[1px] bg-gray-300 mx-auto mt-1'></div>
      <div className='mb-20 pb-32'>{currentRenderedComponent}</div>
    </div>
  );
};

export default Profile;
