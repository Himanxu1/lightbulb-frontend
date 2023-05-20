import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import DeleteModal from "../DeleteModal/DeleteModal";
import { Link } from "react-router-dom";

const ProfileIdeaCard = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <div className=" flex shadow-md border shadow-gray-300 hover:shadow-2xl rounded-md w-[370px]  h-[280px]">
      <img src={props.imageUrl} className="w-12 h-12 mt-10 ml-6" />
      <div className="mt-6">
        <p className="font-medium px-6 mt-4 text-[16px]">{props.title}</p>
        <p className="text-[13px] px-6 mt-4">
          {props.description}...
          <Link
            to={`/ideas/${props.ideaID}`}
            className="text-blue-500 hover:text-black"
          >
            read more
          </Link>
        </p>
        {props.showDelete && (
          <AiFillDelete
            className="text-3xl  ml-56 hover:text-red-500"
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
  );
};

export default ProfileIdeaCard;
