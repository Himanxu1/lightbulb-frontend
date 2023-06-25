import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import imageUrl from "../assets/Group 6.png";
import { AuthContext } from "../Context/AuthContext";
import userImg from "../assets/user (1).png";
import Comment from "../components/Comment/Comment";
import { v4 as uuidv4 } from "uuid";

const IdeaDescription = () => {
  const { ideaID } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [singleIdea, setSingleIdea] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentthought, setCurrentthrought] = useState("");
  const [usercomment, setUsercomment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [added, setAdded] = useState(false);

  const base_url = process.env.REACT_APP_BACKEND_URL;

  const handleReply = (id) => {
    setReplyingTo(id);
  };

  useEffect(() => {
    Axios.get(`${base_url}/api/ideas/${ideaID}`)
      .then((res) => {
        setSingleIdea(res.data?.data);
        setLoading(false);
        //  console.log(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });

    Axios.get(`${base_url}/api/discussions/get-by-id?ideaID=${ideaID}`)
      .then((res) => {
        // console.log(res.data.data);
        setComments(res.data?.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [added]);

  const title = singleIdea[0]?.title;
  const description = singleIdea[0]?.description;
  const images = singleIdea[0]?.images;

  const handlePostClick = () => {
    Axios.post(`${base_url}/api/discussions/save`, {
      comId: uuidv4(),
      name: currentUser.displayName,
      userID: currentUser.uid,
      avatarUrl: currentUser.photoURL,
      ideaID: ideaID,
      comment: usercomment,
      replies: [],
    })
      .then((res) => {
        setUsercomment("");
        setAdded(!added);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className='sm:mx-8 mx-4'>
        <div className='max-w-[1000px] mx-auto md:mt-20 sm:16 mt-12  shadow-lg mb-10 shadow-gray-200 pb-20'>
          <div className='flex mx-9 justify-between'>
            <img src={imageUrl} className='sm:w-20 w-16 mt-8' />
            <div className='space-x-6 ml-6 mt-10 sm:font-bold font-medium sm:text-[16px] text-[14px]'>
              <button className='rounded-md py-2 bg-violet-500 px-6 text-white border-2 hover:text-violet-500 hover:border-violet-400 hover:bg-transparent '>
                Build
              </button>
              <button className='rounded-md py-2  px-6 border-2 border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white'>
                Vouch
              </button>
            </div>
          </div>
          <div className='mx-11 '>
            <p className='font-medium sm:mt-8 mt-6 sm:text-[20px] text-[18px]'>
              {title}
            </p>
            <p className=' mt-2 sm:text-[16px] text-[16px]'>{description}</p>
          </div>
          {/* <div className='flex px-6 mx-12 mt-12 overflow-x-scroll scrollbar-hide '> */}
          <div className='grid grid-cols-3 gap-6 place-items-center px-6 mx-auto mt-12 overflow-x-scroll scrollbar-hide '>
            {images?.map((img) => {
              return (
                <>
                  <img src={img} className='w-66 h-56 rounded-xl' />
                </>
              );
            })}
          </div>
        </div>
        {/* Comment Section */}
        {loading && <h1>Loading</h1>}
        <div className='grid max-w-[800px] mx-auto px-10 sm:px-3 md:px-0 mb-20'>
          <div className='relative flex sm:flex-row flex-col md:space-x-8 w-full '>
            <input
              className='outline-none border-b-2 h-12 w-full bg-transparent '
              type='text'
              placeholder='Share your thought on our Idea...'
              value={usercomment}
              onChange={(e) => setUsercomment(e.target.value)}
            />
            <button
              onClick={handlePostClick}
              className='w-24 mt-2 sm:mt-0 ml-2 p-8 rounded-md py-3 font-medium sm:text-[16px] text-[14px] bg-black hover:bg-gray-300 text-white hover:text-black'
            >
              Post
            </button>
          </div>
          <div className='grid ml-10 mt-10 gap-y-6'>
            {comments?.map((userComment) => {
              return (
                <>
                  <Comment
                    username={"max"}
                    fullname={userComment.name}
                    id={userComment.comId}
                    text={userComment.comment}
                    onReply={handleReply}
                    image={userComment.avatarUrl}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default IdeaDescription;
