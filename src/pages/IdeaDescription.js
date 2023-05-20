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

  // console.log("IdeaDescription")
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
        // console.log("successful");
        setUsercomment("");
        setAdded(!added);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="mt-20 mx-12  h-[600px] shadow-2xl mb-10 shadow-gray-300">
        <div className="flex mx-8 justify-between">
          <img src={imageUrl} className="w-20 h-20 mt-8 ml-6" />
          <div className="space-x-6 ml-6 mt-10 mr-10">
            <button className="rounded-md py-2 bg-violet-500 px-6 text-white font-bold border-2 hover:text-violet-500 hover:border-violet-400 hover:bg-transparent ">
              Build
            </button>
            <button className="rounded-md py-2  px-6 border-2 border-violet-500 font-bold text-violet-500 hover:bg-violet-500 hover:text-white">
              Vouch
            </button>
          </div>
        </div>
        <p className="font-medium px-6 mt-8 ml-10 text-[20px]">{title}</p>
        <p className=" px-6 mt-8 ml-10 text-[16px]">{description}</p>
        <div className="flex px-6 mx-12 mt-12 overflow-x-scroll scrollbar-hide ">
          {images?.map((img) => {
            return (
              <>
                <img src={img} className="w-66 h-56 mr-4 rounded-xl" />
              </>
            );
          })}
        </div>
      </div>
      {/* Comment Section */}
      {loading && <h1>Loading</h1>}
      <div className="grid  mx-12 mb-20">
        <div className="flex w-full mx-12 ">
          <input
            className="outline-none border-b-2 h-12 w-[600px] bg-transparent "
            type="text"
            placeholder="Share your thought on our Idea..."
            value={usercomment}
            onChange={(e) => setUsercomment(e.target.value)}
          />
          <button
            onClick={handlePostClick}
            className="bg-black text-white px-8 rounded-md ml-28 py-0"
          >
            Post
          </button>
        </div>
        <div className="grid ml-10 mt-10 gap-y-6">
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
    </>
  );
};

export default IdeaDescription;
