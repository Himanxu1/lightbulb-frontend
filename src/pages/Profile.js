import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import NameModal from "../components/NameModal/NameModal";
import axios from "axios";

// for notifivation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { id } = useParams();

  const { currentUser } = useContext(AuthContext);
  const [stranger, setStranger] = useState(false);

  const [currentComponent, setCurrentComponent] = useState("vouched");
  const [UserDetails, setUserDetails] = useState();
  const [name, setName] = useState("");
  const [showName, setShowName] = useState(false);
  const [bio, setBio] = useState("");
  const [showBio, setBioShow] = useState(false);
  const [twitter, setTwitter] = useState("");
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const handleClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  useEffect(() => {
    setStranger(id === currentUser?.uid ? false : true);
  }, [id, currentUser]);

  let currentRenderedComponent = null;
  if (currentComponent === "vouched") {
    currentRenderedComponent = <VouchedCard stranger={stranger} id={id} />;
  } else if (currentComponent === "created") {
    currentRenderedComponent = <CreatedCard stranger={stranger} id={id} />;
  } else if (currentComponent === "build") {
    currentRenderedComponent = <BuildCard />;
  }

  //----------- notification -------------
  const successNotify = (val) => {
    toast.success(val, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const logout = () => {
    signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    axios
      .get(`${base_url}/api/auth?userId=${id}`)
      .then((res) => {
        setUserDetails(res.data.data[0]);
        setName(res.data.data[0].name);
        setBio(res.data.data[0].bio);
        setTwitter(res.data.data[0].twitter);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stranger]);

  const editName = () => {
    setShowName(!showName);
  };

  const editBio = () => {
    setBioShow(!showBio);
  };

  const updateTwitter = () => {
    axios
      .put(`${base_url}/api/auth/updateTwitter?userId=${id}`, {
        twitter: twitter,
      })
      .then((res) => {
        successNotify("Twitter updated");
        // console.log("after res " + res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!UserDetails) {
    return <div className="w-full mt-36 text-center">Loading...</div>;
  }

  return (
    <div className="relative md:mt-20 sm:mt-10 mt-0 md:mx-12 sm:mx-8 mx-4">
      <div className="grid place-items-center">
        <img
          src={UserDetails?.photoUrl}
          className="sm:w-28 w-22 sm:h-28 h-22 sm:mt-2 mt-14 rounded-full"
        />
        {!stranger && (
          <div className=" flex flex-col items-center sm:text-lg text-base my-4">
            <button
              className="w-3/5 mt-2 p-2 border border-violet-400 rounded-xl hover:bg-violet-500 hover:text-white"
              onClick={logout}
            >
              Signout
            </button>
            <div className="flex space-x-4">
              <button
                className=" mt-2 p-2 border border-violet-400 rounded-xl hover:bg-violet-500 hover:text-white"
                onClick={editName}
              >
                Edit Name
              </button>
              {showName && (
                <div className="bg-gray-200">
                  <div className="fixed w-full top-50 -left-1 z-50">
                    {/* <div className='absolute left-[1%] right-[1%]'> */}
                    <NameModal
                      id={UserDetails?.userId}
                      showName={showName}
                      setName={setName}
                      setShowName={setShowName}
                    />
                    {/* </div> */}
                  </div>
                </div>
              )}
              <button
                className=" mt-2 p-2 border border-violet-400 rounded-xl hover:bg-violet-500 hover:text-white"
                onClick={editBio}
              >
                Edit Bio
              </button>
              {showBio && (
                <div className="bg-gray-200">
                  <div className="fixed w-full top-50 -left-1 z-50">
                    {/* <div className='absolute left-[1%] right-[1%]'> */}
                    <BioModal
                      id={UserDetails?.userId}
                      showBio={showBio}
                      setBio={setBio}
                      setBioShow={setBioShow}
                    />
                    {/* </div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <h1 className="font-bold sm:text-xl text-lg sm:mt-4 mt-2">@{name}</h1>
        <p className="text-center sm:text-xl text-lg sm:mt-4 mt-2 text-[18px]">
          {bio}
        </p>
        {(twitter || !stranger) && (
          <div className="flex sm:flex-row flex-col space-x-2 items-center">
            <h1 className="sm:text-lg text-ml sm:mt-4 mt-2">Twitter :</h1>
            {/* {twitter ? ( */}
            <div className="flex sm:flex-row flex-col space-x-2 items-center">
              <input
                type="text"
                value={twitter}
                className="min-w-full px-2 py-1 text-center sm:text-lg text-base bg-gray-200 rounded-lg sm:mt-4 mt-2"
                onChange={(e) => setTwitter(e.target.value)}
              />
              {!stranger && (
                <button
                  className="w-20 px-2 py-1 text-center sm:text-lg text-base bg-gray-400 rounded-lg sm:mt-4 mt-2 hover:bg-gray-900 text-white"
                  onClick={() => {
                    updateTwitter();
                  }}
                >
                  update
                </button>
              )}
            </div>
            {/* ) : ( */}
            {/* // <></> */}
            {/* <button className='px-2 py-1 text-center sm:text-lg text-base bg-gray-200 rounded-lg sm:mt-4 mt-2 hover:bg-gray-900 hover:text-white'>
                Add Twitter
              </button> */}
            {/* )} */}
          </div>
        )}
      </div>
      <div className="flex justify-around sm:mt-14 mt-10 md:font-medium md:text-lg text-base ">
        <Link
          // className='flex items-center text-gray-400'
          className={`flex items-center  ${
            currentComponent === "vouched" ? "" : "text-gray-400"
          }`}
          onClick={() => handleClick("vouched")}
        >
          <h1 className="mr-2 ml-4">Vouched</h1>
          <IoBulbOutline className="text-[22px]" />
        </Link>
        <Link
          className={`flex items-center  ${
            currentComponent === "created" ? "" : "text-gray-400"
          }`}
          onClick={() => handleClick("created")}
        >
          <h1 className="">Created</h1>
          <BsPen className="ml-2" />
        </Link>
        <Link
          className={`flex items-center  ${
            currentComponent === "build" ? "" : "text-gray-400"
          }`}
          onClick={() => handleClick("build")}
        >
          <h1 className="mr-2">Build</h1>
          <IoBuildOutline className="" />
        </Link>
      </div>
      <div className="h-[1px] bg-gray-300 mx-auto mt-1"></div>
      <div className="mb-20 pb-32">{currentRenderedComponent}</div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
