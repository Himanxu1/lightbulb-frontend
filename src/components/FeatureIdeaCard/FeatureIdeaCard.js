import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Toastify from "toastify-js";
import { VouchContext } from "../../Context/VouchContext";
import { AiFillBoxPlot } from "react-icons/ai";
import { IdeasContext } from "../../Context/IdeasContext";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const FeatureIdeaCard = (props) => {
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const idea = props.ideaId;
  const {setIdeas,ideas} = useContext(IdeasContext)
  const [isVouched, setIsVouched] = useState(false);
  const [noOfVouches, setNoOfVouches] = useState(props.noofvouches);
  const {vouchedData,setVouchedData} = useContext(VouchContext)
  const {currentUser} = useContext(AuthContext)


  useEffect(()=>{
    if(vouchedData){
      const res = vouchedData.filter((item)=>{
        return (item.userID === currentUser.uid && item.ideaID === idea)
      }) 
      if(res){
        setIsVouched(true)
      }
    }
  },[isVouched])

  const vouch = (userId) => {
     
      const result = vouchedData.filter((item) =>  {
       return item.userID !== userId
     })
     if(!result || result.length === 0){
      Axios.put(`${base_url}/api/ideas/vouch?id=${props.id}`,{userID:userId})
      .then((res) => {
        setNoOfVouches((res.data.data.length)-1)
        setIsVouched(true)
      }).catch((err) => {
        console.log(err);
      });

  Axios.post(`${base_url}/api/vouches/vouch`, {
    userID: userId,
    ideaID: idea,
  })
    .then((res) => {
      setVouchedData([...vouchedData, res.data]);
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
     }else{
         alert("already vouched")
     } 
    
  };

  const handleVouch = () => {
    vouch(currentUser.uid);
  };
  
  return (
    <div className="shadow-md border shadow-gray-300 hover:shadow-2xl rounded-md w-96  h-[380px]">
      <img src={props.imageUrl} className="w-12 h-12 mt-8 ml-6" />
      <p className="font-medium px-6 mt-4 text-[18px]">{props.title}</p>
      <p className="text-[15px] px-6 mt-4 w-80">
        {props.description}
        <Link to={`/ideas/${idea}`} className="text-blue-500 hover:text-black">
          ...read more
        </Link>
      </p>
      <div className="space-x-6 ml-6 mt-8">
        <Link to={`/ideas/${idea}`}>
          <button className="rounded-md py-2 bg-violet-500 px-6 text-white font-bold  border-2 hover:text-violet-500 hover:border-violet-400 hover:bg-transparent ">
            Build
          </button>
        </Link>
        {
          isVouched ? ( <button
          className="rounded-md py-2  px-6 border-2 border-violet-500 font-bold text-violet-500 hover:bg-violet-500 hover:text-white"
          onClick={handleVouch}
         
        >
          Vouched
          <span className="">({noOfVouches})</span>
        </button> ) : (

        <button
        className="rounded-md py-2  px-6 border-2 border-violet-500 font-bold text-violet-500 hover:bg-violet-500 hover:text-white"
        onClick={handleVouch}
       
      >
        Vouch
        <span className="">({noOfVouches})</span>
      </button>
      )
        }
       
      </div>
    </div>
  );
};

export default FeatureIdeaCard;
