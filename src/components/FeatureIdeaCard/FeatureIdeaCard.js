import React from "react";

const FeatureIdeaCard = (props) => {
  return (
    <div className="shadow-md border shadow-gray-300 hover:shadow-2xl rounded-md w-96  h-[380px]">
      <img src={props.imageUrl} className="w-12 h-12 mt-8 ml-6" />
      <p className="font-medium px-6 mt-4 text-[18px]">{props.title}</p>
      <p className="text-[15px] px-6 mt-4 w-80">{props.description}</p>
      <div className="space-x-6 ml-6 mt-8">
        <button className="rounded-md py-2 bg-violet-500 px-6 text-white font-bold ">
          Build
        </button>
        <button className="rounded-md py-2  px-6 border-2 border-violet-500 font-bold text-violet-500">
          Vouch
        </button>
      </div>
    </div>
  );
};

export default FeatureIdeaCard;
