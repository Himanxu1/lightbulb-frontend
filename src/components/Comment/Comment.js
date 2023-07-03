import Axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../Context/AuthContext";
import { BsFillReplyFill } from "react-icons/bs";

const base_url = process.env.REACT_APP_BACKEND_URL;

const Comment = ({ ideaID, id, text, onReply, image, username, fullname }) => {
  const { currentUser } = useContext(AuthContext);

  const [allReplies, setAllReplies] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    onReply(id);
    setShowInput(!showInput);
  };

  const handleReplyPost = () => {
    Axios.put(`${base_url}/api/discussions/save-reply?comId=${id}`, {
      comId: uuidv4(),
      name: currentUser.displayName,
      userID: currentUser.uid,
      avatarUrl: currentUser.photoURL,
      comment: replyText,
    })
      .then((res) => {
        // console.log([res.data.data]);
        setAllReplies([res.data.data]);
        setShowInput(false);
        setReplyText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Axios.get(`${base_url}/api/discussions/get-by-id?ideaID=${ideaID}`)
      .then((res) => {
        // console.log(res.data.data);
        const filteredResult = res.data.data.filter((item) => {
          return item.comId === id;
        });
        setAllReplies(filteredResult);
      })
      .catch((err) => console.log(err));
  }, []);
  // useEffect(() => {
  //   console.log(allReplies);
  // }, [allReplies]);
  return (
    <>
      <div className='flex'>
        <img src={image} className='w-14 h-14 rounded-md' />
        <div className='grid ml-4'>
          <p className='font-semibold'>
            {fullname}
            <span className='text-pink-400 ml-1'>@{username}</span>
          </p>
          <p>{text}</p>
          <p
            onClick={handleReply}
            className='flex text-[14px] cursor-pointer hover:text-gray-500 '
          >
            <BsFillReplyFill className='text-[20px]' />
            Reply
          </p>

          {/*  reply section */}
          {showInput && (
            <div className='flex mt-4'>
              <input
                text='text'
                placeholder='reply'
                className='bg-gray-200 outline-none border-b-2 w-72 pl-2'
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button
                className='text-[18px] px-4 bg-black text-white rounded-md ml-2'
                onClick={() => {
                  if (replyText.length > 0) {
                    handleReplyPost();
                  }
                }}
              >
                Post
              </button>
            </div>
          )}

          {/* replies */}
          {allReplies[0]?.replies.map((reply) => {
            return (
              <>
                <div className='flex mt-6'>
                  <img src={reply.avatarUrl} className='w-14 h-14 rounded-md' />
                  <div className='grid ml-4'>
                    <p className='font-semibold'>
                      {reply.fullname}
                      <span className='text-pink-400 ml-1'>@{reply.name}</span>
                    </p>
                    <p>{reply.comment}</p>
                    <p
                      onClick={handleReply}
                      className='flex text-[14px] cursor-pointer hover:text-gray-500 '
                    >
                      <BsFillReplyFill className='text-[20px]' />
                      Reply
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Comment;
