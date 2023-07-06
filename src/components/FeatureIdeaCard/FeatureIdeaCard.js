import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Toastify from "toastify-js";
import { FaListUl } from "react-icons/fa";

import { IdeasContext } from "../../Context/IdeasContext";
import { VouchContext } from "../../Context/VouchContext";
import { AuthContext } from "../../Context/AuthContext";

import VouchersList from "../VouchersList/VouchersList";

const FeatureIdeaCard = (props) => {
  const { currentUser } = useContext(AuthContext);

  const [userImage, setUserImage] = useState(props.imageUrl);
  const idea = props.ideaId;
  const [isVouched, setIsVouched] = useState(false);
  const [twitterLink, setTwitterLink] = useState("");
  const [noOfVouches, setNoOfVouches] = useState(0);
  const { vouchedData, setVouchedData } = useContext(VouchContext);
  const base_url = process.env.REACT_APP_BACKEND_URL;

  const [showVouchers, setShowVouchers] = useState(false);

  useEffect(() => {
    Axios.get(`${base_url}/api/auth?userId=${props.userId}`)
      .then((res) => {
        // console.log(res.data.data[0]?.twitter);
        setTwitterLink(res.data.data[0]?.twitter);
      })
      .catch((err) => console.log(err));
  }, []);

  //--------- getting the idea creator image -------
  useEffect(() => {
    setUserImage(props.userPhotoUrl);
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
          // setIsVouched(true);
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
          // setIsVouched(false);
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
    if (currentUser) {
      vouch(props.ideaId);
    } else {
      alert("Please sign in first.");
    }
  };

  return (
    <div className='relative flex flex-col shadow-md border shadow-gray-100 hover:shadow-lg rounded-md  h-[280px]'>
      <div className='flex'>
        <div className='mt-10 ml-6'>
          <Link to={`/profile/${props.userId}`}>
            <img
              src={userImage ? userImage : props.imageUrl}
              className='md:w-16 sm:w-14 w-12 md:h-16 sm:h-14 h-12 shadow-md hover:border-[.1px] hover:shadow rounded-xl'
            />
          </Link>
        </div>
        <div className='w-10/12 mt-6'>
          <p className='font-medium px-6 mt-4 overflow-hidden text-overflow-ellipsis line-clamp-2'>
            {props.title}
          </p>
          <p className='text-[15.5px] px-6 mt-2 overflow-hidden text-overflow-ellipsis line-clamp-3'>
            {props.description}
          </p>
          <Link to={`/ideas/${idea}`}>
            <p className='text-[15.5px] px-6 mt-2 text-blue-500 cursor-pointer'>
              Read more
            </p>
          </Link>
        </div>
      </div>
      <div className='absolute bottom-10 right-10 font-bold sm:text-[16px] text-[14px]'>
        {/* <button className='font-medium text-left'>Vouchers</button> */}
        <div className='flex sm:space-x-6 space-x-2'>
          {twitterLink && (
            <Link to={`${twitterLink}`} target='_blank'>
              <button className='rounded-md py-2 bg-violet-500 px-6 text-white  border-2 hover:text-violet-500 hover:border-violet-400 hover:bg-transparent '>
                Build
              </button>
            </Link>
          )}
          <div className='flex space-x-1'>
            <button
              className='rounded-md py-2  sm:px-6 px-4 border-2 border-violet-500  text-violet-500 hover:bg-violet-500 hover:text-white'
              onClick={handleVouch}
            >
              {isVouched ? "Vouched" : "Vouch"}
              <span className=''>({noOfVouches})</span>
            </button>
            <button
              className='rounded-md px-3 border-2 border-violet-500  text-violet-500 hover:bg-violet-500 hover:text-white'
              onClick={() => setShowVouchers(!showVouchers)}
            >
              <div className='text-xl '>
                <FaListUl />
              </div>
            </button>
            {showVouchers && (
              <div className='bg-gray-200'>
                <div className='fixed top-44 lg:left-28 md:left-1 left-1 lg:w-4/5 w-full min-w-fit z-50'>
                  <VouchersList
                    showVouchers={showVouchers}
                    setShowVouchers={setShowVouchers}
                    ideaId={props.ideaId}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureIdeaCard;
