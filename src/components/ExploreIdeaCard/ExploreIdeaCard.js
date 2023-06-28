import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Toastify from "toastify-js";
import { IdeasContext } from "../../Context/IdeasContext";
import { VouchContext } from "../../Context/VouchContext";
import { AuthContext } from "../../Context/AuthContext";

const ExploreIdeaCard = (props) => {
  const { currentUser } = useContext(AuthContext);

  const [userImage, setUserImage] = useState(props.imageUrl);
  const idea = props.ideaId;
  const [isVouched, setIsVouched] = useState(false);
  const [noOfVouches, setNoOfVouches] = useState(0);
  const { vouchedData, setVouchedData } = useContext(VouchContext);
  const base_url = process.env.REACT_APP_BACKEND_URL;

  //--------- getting the idea creator image -------
  useEffect(() => {
    setUserImage(props.UserPhotoUrl);
  });

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
    <div className='relative flex flex-col shadow-md border shadow-gray-100 hover:shadow-lg rounded-md  h-[280px]'>
      <div className='flex'>
        <img
          src={userImage}
          className='sm:w-16 w-12 sm:h-16 h-12 mt-10 ml-6 shadow-md hover:border-[.1px] hover:shadow rounded-xl'
        />
        <div className='mt-6'>
          <p className='font-medium px-6 mt-4 text-[18px]'>{props.title}</p>
          {/* <div className='flex relative'> */}
          <p className='text-[15px] px-6 mt-2 truncate text-ellipsis whitespace-normal break-all max-h-[90px]'>
            {props.description}
          </p>
          {/* <p className='absolute bottom-0 right-5'>...</p> */}
          {/* </div> */}
        </div>
      </div>
      <div className='absolute bottom-10 right-10 font-bold sm:text-[16px] text-[14px] space-x-6 '>
        <Link to={`/ideas/${props.ideaId}`}>
          <button className='rounded-md py-2 bg-violet-500 px-6 text-white  border-2 hover:text-violet-500 hover:border-violet-400 hover:bg-transparent '>
            Build
          </button>
        </Link>
        <button
          className='rounded-md py-2  sm:px-6 px-4 border-2 border-violet-500  text-violet-500 hover:bg-violet-500 hover:text-white'
          onClick={handleVouch}
        >
          {isVouched ? "Vouched" : "Vouch"}
          <span className=''>({noOfVouches})</span>
        </button>
      </div>
    </div>
  );
};

export default ExploreIdeaCard;
