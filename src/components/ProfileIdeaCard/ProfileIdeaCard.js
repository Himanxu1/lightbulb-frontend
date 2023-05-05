import React from "react";

const ProfileIdeaCard = (props) => {
  return (
    <div className=" flex shadow-md border shadow-gray-300 hover:shadow-2xl rounded-md w-[370px]  h-[280px]">
      <img src={props.imageUrl} className="w-12 h-12 mt-10 ml-6" />
      <div className="mt-6">
        <p className="font-medium px-6 mt-4 text-[16px]">{props.title}</p>
        <p className="text-[13px] px-6 mt-4">{props.description}</p>
      </div>
    </div>
  );
};

export default ProfileIdeaCard;
