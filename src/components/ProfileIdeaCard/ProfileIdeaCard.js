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
    <div className='relative w-full max-w-[420px] '>
      <div className=' flex shadow-md border shadow-gray-200 hover:shadow-lg rounded-md   h-[250px]'>
        <div className='mt-10 ml-6'>
          <Link to={`/profile/${props.userID}`}>
            <img
              src={props.userPhotoUrl ? props.userPhotoUrl : props.imageUrl}
              className='md:w-16 sm:w-14 w-12 md:h-16 sm:h-14 h-12 shadow-md hover:border-[.1px] hover:shadow rounded-xl'
            />
          </Link>
        </div>
        <div className='w-10/12 mt-6'>
          <p className='font-medium px-6 mt-4 text-[16px]'>{props.title}</p>
          <p className='text-[13px] px-6 mt-4 truncate text-ellipsis whitespace-normal break-all max-h-[60px]'>
            {props.description}
          </p>
          <Link
            to={`/ideas/${props.ideaID}`}
            className='text-[13px] px-6 mt-4 text-blue-500 hover:text-black'
          >
            read more ...
          </Link>
          {/* <p className='text-[13px] px-6 mt-4'>{props.description}...<Linkto={`/ideas/${props.ideaID}`}className='text-blue-500 hover:text-black'>read more</Linkto=></p> */}
          {!props.stranger && props.showDelete && (
            <AiFillDelete
              className='absolute -top-1 right-8 text-2xl mt-10  ml-56 hover:text-red-500 hover:-top-[5px]'
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
    </div>
  );
};

export default ProfileIdeaCard;
