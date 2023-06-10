import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Toastify from "toastify-js";
import { IdeasContext } from "../../Context/IdeasContext";
import { VouchContext } from "../../Context/VouchContext";
import { AuthContext } from "../../Context/AuthContext";

const ExploreIdeaCard = (props) => {
  const { currentUser } = useContext(AuthContext);

  const idea = props.ideaId;
  const [isVouched, setIsVouched] = useState(false);
  const [noOfVouches, setNoOfVouches] = useState(0);
  const { vouchedData, setVouchedData } = useContext(VouchContext);
  const base_url = process.env.REACT_APP_BACKEND_URL;

  //--------- getting no of vouches and checking if already vouched -----------
  useEffect(() => {
    Axios.get(`${base_url}/api/ideas/${idea}`)
      .then((res) => {
        // console.log(res.data.data[0].vouches);
        setNoOfVouches(res.data.data[0].vouches.length);
        if (res.data.data[0].vouches.length && currentUser) {
          if (res.data.data[0].vouches.includes(currentUser.uid)) {
            setIsVouched(true);
          } else {
            setIsVouched(false);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [vouchedData]);

  const vouch = (ideaId) => {
    const result = vouchedData.filter((item) => {
      return item.ideaID == ideaId;
    });

    if (result.length == 0) {
      // ----------- adding in Vouch schema --------------
      Axios.post(`${base_url}/api/vouches/vouch`, {
        userID: currentUser.uid,
        ideaID: idea,
      })
        .then((res) => {
          props.successNotify("Vouched Successfully");
          setVouchedData([...vouchedData, res.data.data]);
        })
        .catch((err) => console.log(err));
      // ----------- adding user in ideas schema vouches --------------
      Axios.put(`${base_url}/api/ideas/vouch?ideaId=${ideaId}`, {
        userID: currentUser.uid,
      })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      //----------- removing from Vouch schema --------------
      Axios.delete(
        `${base_url}/api/vouches/delete-vouched?ideaID=${ideaId}&userID=${currentUser.uid}`
      )
        .then((res) => {
          props.errNotify("Unvouched Successfully");
          setVouchedData(vouchedData.filter((item) => item.ideaID !== ideaId));
        })
        .catch((err) => console.log(err));
      //----------- removing user from ideas schema vouches --------------
      Axios.put(`${base_url}/api/ideas/vouch?ideaId=${ideaId}`, {
        userID: currentUser.uid,
      })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleVouch = () => {
    vouch(props.ideaId);
  };
  return (
    <div className=' flex shadow-md border shadow-gray-300 hover:shadow-2xl rounded-md w-[550px]  h-[310px]'>
      <img src={props.imageUrl} className='w-12 h-12 mt-10 ml-6' />
      <div className='mt-6'>
        <p className='font-medium px-6 mt-4 text-[18px]'>{props.title}</p>
        <p className='text-[15px] px-6 mt-4'>{props.description}</p>
        <div className='space-x-6 ml-6 mt-8'>
          <Link to={`/ideas/${props.ideaId}`}>
            <button className='rounded-md py-2 bg-violet-500 px-6 text-white font-bold border-2 hover:text-violet-500 hover:border-violet-400 hover:bg-transparent '>
              Build
            </button>
          </Link>
          <button
            className='rounded-md py-2  px-6 border-2 border-violet-500 font-bold text-violet-500 hover:bg-violet-500 hover:text-white'
            onClick={handleVouch}
          >
            {isVouched ? "Vouched" : "Vouch"}{" "}
            <span className=''>({noOfVouches})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreIdeaCard;
