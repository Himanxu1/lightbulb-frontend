import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IdeasContext } from "../../Context/IdeasContext";
import Axios from "axios";
import Toastify from "toastify-js";
import { VouchContext } from "../../Context/VouchContext";

const ExploreIdeaCard = (props) => {
  const idea = props.ideaId;
  const [isVouched,setIsVouched] =useState(false)
  const {vouchedData} = useContext(VouchContext)
  
  console.log(vouchedData)
  const vouch = (userId) => {
    Axios.post(
      "http://lightbulb-server-env.eba-je399ubq.ap-south-1.elasticbeanstalk.com/api/vouches/vouch",
      { userID: userId, ideaID: idea }
    )
      .then((res) => {
        // console.log(res.data.data)
        
        console.log("idea vouched success");
      })
      .catch((err) => console.log(err));

    Toastify({
      text: "Vouched Idea",
      duration: 2000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: " white",
        color: "black",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  };
  const handleVouch = ()=>{
    vouch(props.userId)
    setIsVouched(true)
  }
  return (
    <div className=" flex shadow-md border shadow-gray-300 hover:shadow-2xl rounded-md w-[550px]  h-[310px]">
      <img src={props.imageUrl} className="w-12 h-12 mt-10 ml-6" />
      <div className="mt-6">
        <p className="font-medium px-6 mt-4 text-[18px]">{props.title}</p>
        <p className="text-[15px] px-6 mt-4">{props.description}</p>
        <div className="space-x-6 ml-6 mt-8">
          <Link to={`/ideas/${props.ideaId}`}  >   
          <button className="rounded-md py-2 bg-violet-500 px-6 text-white font-bold border-2 hover:text-violet-500 hover:border-violet-400 hover:bg-transparent ">
            Build
          </button>
          </Link>
          <button className="rounded-md py-2  px-6 border-2 border-violet-500 font-bold text-violet-500 hover:bg-violet-500 hover:text-white"   onClick={handleVouch} >
            {isVouched ?  "Vouched" :"Vouch"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreIdeaCard;
