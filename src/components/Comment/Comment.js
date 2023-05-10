import { Axios } from "axios";
import React, { useState } from "react";
import { BsFillReplyFill } from "react-icons/bs";

const Comment = ({ id, text, onReply, image, username, fullname }) => {
  const [showInput, setShowInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    onReply(id);
    setShowInput(!showInput);
  };

  const handleReplyPost = () => {
    // Axios.post('').then((res)=>{
    //   console.log(res)
    // }).catch((err)=>{
    //   console.log(err)
    // })
  };

  // console.log(replyText)

  return (
    <>
      <div className="flex">
        <img src={image} className="w-14 h-14 rounded-md" />
        <div className="grid ml-4">
          <p className="font-semibold">
            {fullname}
            <span className="text-pink-400 ml-1">@{username}</span>
          </p>
          <p>{text}</p>
          <p
            onClick={handleReply}
            className="flex text-[14px] cursor-pointer hover:text-gray-500 "
          >
            <BsFillReplyFill className="text-[20px]" />
            Reply
          </p>

          {/*  reply section */}
          {showInput && (
            <div className="flex mt-4">
              <input
                text="text"
                placeholder="reply"
                className="bg-gray-200 outline-none border-b-2 w-56"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button
                className="text-[18px] px-4 bg-black text-white rounded-md ml-2"
                onClick={handleReplyPost}
              >
                Post
              </button>
            </div>
          )}

          {/* replies */}
          {/* {
        replies.map((reply)=>{
          return (
            <>
            <div className='flex mt-6'>
               <img src={reply.image} className="w-14 h-14 rounded-md" />
            <div className="grid ml-4">
              <p className="font-semibold">
               {reply.fullname}  
             <span className="text-pink-400 ml-1">@{reply.username}</span>
              </p>
              <p>{reply.text}</p>
              <p
                onClick={handleReply}
                className="flex text-[14px] cursor-pointer hover:text-gray-500 "
              >
                <BsFillReplyFill className="text-[20px]" />
                Reply
              </p>
              </div>
            </div>
            </>
          )
        })
       } */}
        </div>
      </div>
    </>
  );
};

export default Comment;
