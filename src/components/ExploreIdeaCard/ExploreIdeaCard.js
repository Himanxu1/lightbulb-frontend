import React from "react";

const ExploreIdeaCard = (props) => {
  return (
    <div className=" flex shadow-md border shadow-gray-300 hover:shadow-2xl rounded-md w-[550px]  h-[310px]">
      <img src={props.imageUrl} className="w-12 h-12 mt-10 ml-6" />
      <div className="mt-6">
        <p className="font-medium px-6 mt-4 text-[18px]">{props.title}</p>
        <p className="text-[15px] px-6 mt-4">{props.description}</p>
        <div className="space-x-6 ml-6 mt-8">
          <button className="rounded-md py-2 bg-violet-500 px-6 text-white font-bold border-2 hover:text-violet-500 hover:border-violet-400 hover:bg-transparent ">
            Build
          </button>
          <button className="rounded-md py-2  px-6 border-2 border-violet-500 font-bold text-violet-500 hover:bg-violet-500 hover:text-white">
            Vouch
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreIdeaCard;
