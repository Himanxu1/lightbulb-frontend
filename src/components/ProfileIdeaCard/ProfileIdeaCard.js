import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import DeleteModal from "../DeleteModal/DeleteModal";
import { Link } from "react-router-dom";

const ProfileIdeaCard = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="relative flex flex-col myShadow rounded-3xl h-[300px]">
        <div className="flex">
          <div className="mt-10 ml-8">
            <Link to={`/profile/${props.userID}`}>
              <img
                src={props.userPhotoUrl ? props.userPhotoUrl : props.imageUrl}
                className="md:w-16 sm:w-14 w-12 md:h-16 sm:h-14 h-12 shadow-md hover:border-[.1px] hover:shadow rounded-2xl"
              />
            </Link>
          </div>
          <div className="w-10/12 mt-6">
            <p className="font-medium text-gray-800 text-xl px-7 mt-4 overflow-hidden text-overflow-ellipsis line-clamp-2">
              {props.title}
            </p>
            <p className="text-[17px] text-gray-600 px-7 mt-2 overflow-hidden text-overflow-ellipsis line-clamp-3">
              {props.description}
            </p>
            <Link to={`/ideas/${props.ideaID}`}>
              <p className="text-[15.5px] px-7 mt-1 font-[500] text-gray-500 underline underline-offset-2 cursor-pointer">
                Read more
              </p>
            </Link>
            {!props.stranger && props.showDelete && (
              <AiFillDelete
                className="absolute -top-1 right-8 text-2xl mt-10  ml-56 hover:text-red-500 hover:-top-[5px]"
                onClick={handleClick}
              />
            )}
            {show && (
              <DeleteModal
                show={show}
                created={props.created}
                setCreated={props.setCreated}
                setShow={setShow}
                id={props.id}
              />
            )}
          </div>
        </div>
        <div className="absolute bottom-10 right-10 font-bold sm:text-[16px] text-[14px]">
          {/* <button className='font-medium text-left'>Vouchers</button> */}
          {/* <div className="flex sm:space-x-6 space-x-2">
          {twitterLink && (
            <Link to={`https://twitter.com/${twitterLink}`} target="_blank">
              <button className="rounded-xl py-2 bg-violet-500 px-6 text-white border-2 hover:text-violet-500 hover:border-violet-400 hover:bg-transparent">
                Build
              </button>
            </Link>
          )}
          <div className="flex space-x-1">
            <button
              className="myFont rounded-xl py-2  sm:px-6 px-4 border-2 border-violet-500  text-violet-500 hover:bg-violet-500 hover:text-white"
              onClick={handleVouch}
            >
              {isVouched ? "Vouched " : "Vouch "}
              <span className="myFont ">({noOfVouches})</span>
            </button>
            <button
              className="rounded-xl px-3 border-2 border-violet-500  text-violet-500 hover:bg-violet-500 hover:text-white"
              onClick={() => setShowVouchers(!showVouchers)}
            >
              <div className="text-xl ">
                <FaListUl />
              </div>
            </button>
            {showVouchers && (
              <div className="bg-gray-200">
                <div className="fixed top-44 lg:left-28 md:left-1 left-1 lg:w-4/5 w-full min-w-fit z-50">
                  <VouchersList
                  showVouchers={showVouchers}
                    setShowVouchers={setShowVouchers}
                    ideaId={props.ideaId}
                  />
                </div>
              </div>
            )}
          </div>
        </div> */}
        </div>
      </div>
    </>
    // <div className="relative mx-auto w-full max-w-[420px] ">
    //   <div className=" flex hover:border-gray-300 myShadow rounded-2xl h-[250px]">
    //     <div className="mt-10 ml-6">
    //       <Link to={`/profile/${props.userID}`}>
    //         <img
    //           src={props.userPhotoUrl ? props.userPhotoUrl : props.imageUrl}
    //           className="md:w-16 sm:w-14 w-12 md:h-16 sm:h-14 h-12 shadow-md hover:border-[.1px] hover:shadow rounded-full"
    //         />
    //       </Link>
    //     </div>
    //     <div className="w-10/12 mt-6">
    //       {/* <div className='w-10/12 mt-6'> */}
    //       <p className="w-10/12 font-medium px-6 mt-4 overflow-hidden text-overflow-ellipsis line-clamp-2">
    //         {props.title}
    //       </p>
    //       <p className="text-[15.5px] px-6 mt-2 overflow-hidden text-overflow-ellipsis line-clamp-4">
    //         {props.description}
    //       </p>
    //       {/* </div> */}
    //       {/* <p className='font-medium px-6 mt-4 text-[16px]'>{props.title}</p>
    //     <p className='text-[13px] px-6 mt-4 truncate text-ellipsis whitespace-normal break-all max-h-[60px]'>
    //       {props.description}
    //     </p> */}
    //       <Link
    //         to={`/ideas/${props.ideaID}`}
    //         className="text-[13px] px-6 mt-4 text-blue-500 hover:text-black"
    //       >
    //         read more ...
    //       </Link>
    //       {/* <p className='text-[13px] px-6 mt-4'>{props.description}...<Linkto={`/ideas/${props.ideaID}`}className='text-blue-500 hover:text-black'>read more</Linkto=></p> */}
    //       {!props.stranger && props.showDelete && (
    //         <AiFillDelete
    //           className="absolute -top-1 right-8 text-2xl mt-10  ml-56 hover:text-red-500 hover:-top-[5px]"
    //           onClick={handleClick}
    //         />
    //       )}
    //       {show && (
    //         <DeleteModal
    //           show={show}
    //           created={props.created}
    //           setCreated={props.setCreated}
    //           setShow={setShow}
    //           id={props.id}
    //         />
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProfileIdeaCard;
