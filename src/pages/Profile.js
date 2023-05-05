import React, {useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BsPen } from "react-icons/bs";
import { IoBuildOutline } from "react-icons/io5";
import { IoBulbOutline } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import VouchedCard from "../components/VouchedCard/VouchedCard";
import BuildCard from "../components/BuildCard/BuildCard";
import CreatedCard from "../components/CreatedCard/CreatedCard";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [currentComponent, setCurrentComponent] = useState("vouched");

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


  console.log(currentUser?.photoURL);
  return (
    <div className="mt-20 mx-12   h-[1300px] shadow-2xl  shadow-gray-300 ">
      <div className="grid place-items-center mt-20 pt-20">
        <img src={currentUser?.photoURL} className="w-28 h-28 rounded-xl " />
        <h1 className="font-bold text-xl mt-4">@{currentUser?.displayName}</h1>
        <p className="text-center mx-60 mt-4 text-[18px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus enim
          vitae eget facilisis eget dignissim congue. Ac dolor cras arcu duis
          dictum. Nam venenatis diam et consequat pellentesque gravida dolor
          bibendum. Vehicula in bibendum quis justo.
        </p>
      </div>
      <div className="flex justify-center mt-14 space-x-64 font-bold text-xl ">
        <Link className="flex" onClick={() => handleClick("vouched")} >
          <h1 className="mr-2 ml-4" >Vouched</h1>
          <IoBulbOutline className="text-[22px]" />
        </Link>
        <Link className="flex items-center text-gray-400" onClick={() => handleClick("created")}>
          <h1 className="" >Created</h1>

          <BsPen className="ml-2" />
        </Link>
        <Link className="flex items-center text-gray-400 mr-4" onClick={() => handleClick("build")}>
          <h1 className="mr-2">Build</h1>
          <IoBuildOutline className="" />
        </Link>
      </div>
      <div className="h-1 bg-gray-300 mx-60 mt-1"></div>
          {currentRenderedComponent}
    </div>
  );
};

export default Profile;
