import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";
import LinkModal from "../components/LinkModal/LinkModal";
import imageUrl from "../assets/Group 6.png";
import { AuthContext } from "../Context/AuthContext";
import { VouchContext } from "../Context/VouchContext";
import userImg from "../assets/user (1).png";
import Comment from "../components/Comment/Comment";
import { v4 as uuidv4 } from "uuid";

// for notifivation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineShare } from "react-icons/md";

const IdeaDescription = () => {
  const { ideaID } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [stranger, setStranger] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { vouchedData, setVouchedData } = useContext(VouchContext);
  const [isVouched, setIsVouched] = useState(false);
  const [noOfVouches, setNoOfVouches] = useState(0);
  const [twitterLink, setTwitterLink] = useState("");

  const [singleIdea, setSingleIdea] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentthought, setCurrentthrought] = useState("");
  const [usercomment, setUsercomment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [added, setAdded] = useState(false);

  const base_url = process.env.REACT_APP_BACKEND_URL;

  const location = useLocation();

  useEffect(() => {
    setStranger(id === currentUser?.uid ? false : true);
  }, [id, currentUser]);

  //----------- notification -------------
  const successNotify = (val) => {
    toast.success(val, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const errNotify = (val) => {
    toast.error(val, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleClose = (e) => {
    setShowModal(false);
  };

  useEffect(() => {
    // console.log(singleIdea[0]?.userID);
    Axios.get(`${base_url}/api/auth?userId=${singleIdea[0]?.userID}`)
      .then((res) => {
        // console.log(res.data.data[0].twitter);
        setTwitterLink(res.data.data[0]?.twitter);
      })
      .catch((err) => console.log(err));
  }, [singleIdea]);

  //--------- getting no of vouches -----------
  useEffect(() => {
    Axios.get(`${base_url}/api/ideas/${ideaID}`)
      .then((res) => {
        // console.log(res.data.data[0].userID);
        setId(res.data.data[0].userID);
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
      return item?.ideaID == ideaId;
    });

    if (result.length == 0) {
      // ----------- adding in Vouch schema --------------
      Axios.post(`${base_url}/api/vouches/vouch`, {
        userID: currentUser.uid,
        ideaID: ideaID,
      })
        .then((res) => {
          successNotify("Vouched Successfully");
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
          errNotify("Unvouched Successfully");
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
    vouch(ideaID);
  };

  const handleReply = (id) => {
    setReplyingTo(id);
  };

  useEffect(() => {
    Axios.get(`${base_url}/api/ideas/${ideaID}`)
      .then((res) => {
        setSingleIdea(res.data?.data);
        setLoading(false);
        // console.log(res.data?.data);
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
  }, [added, location]);

  const title = singleIdea[0]?.title;
  const category = singleIdea[0]?.category;
  const description = singleIdea[0]?.description;
  const images = singleIdea[0]?.images;
  const userPhotoUrl = singleIdea[0]?.userPhotoUrl;

  const handlePostClick = () => {
    if (currentUser && currentUser?.uid) {
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
    } else {
      alert("Please sign in first");
    }
  };

  return (
    <>
      <div className='sm:mx-8 mx-1'>
        <div className='max-w-[1000px] mx-auto md:mt-20 sm:16 mt-12  shadow-lg mb-10 shadow-gray-200 pb-20'>
          <div className='flex mx-9 justify-between'>
            <Link to={`/profile/${singleIdea[0]?.userID}`}>
              <img
                src={userPhotoUrl ? userPhotoUrl : imageUrl}
                className='sm:w-20 w-[65px] mt-10 shadow-md hover:border-[.1px] hover:shadow rounded-full'
              />
            </Link>
            <div className='ml-6 mt-10 sm:font-bold font-medium sm:text-[16px] text-[14px]'>
              <div className='flex sm:space-x-6 space-x-3'>
                {twitterLink && (
                  <Link
                    to={`https://twitter.com/${twitterLink}`}
                    target='_blank'
                  >
                    <button className='rounded-md py-2 bg-violet-500 px-6 text-white border-2 hover:text-violet-500 hover:border-violet-400 hover:bg-transparent'>
                      Build
                    </button>
                  </Link>
                )}
                {/* {!stranger && ( */}
                <button
                  className='rounded-md py-2 px-6 border-2 border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white'
                  onClick={handleVouch}
                >
                  {isVouched ? "Vouched" : "Vouch"}
                  <span className=''>({noOfVouches})</span>
                </button>

                {/*-------------- share btn ------------------*/}
                <button
                  className='flex space-x-2 px-2 rounded-lg bg-violet-500 items-center text-white border-2 hover:bg-white hover:text-violet-500 hover:border-violet-500'
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <MdOutlineShare />
                  <span>Share</span>
                </button>
                {/* )} */}

                {/*------------- modal to copy link -------------*/}
                <div className='fixed w-full top-20 -left-4 z-50'>
                  <LinkModal
                    notify={successNotify}
                    ideaID={ideaID}
                    visible={showModal}
                    setVisible={setShowModal}
                    handleClose={handleClose}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='mx-11 '>
            <p className='font-medium sm:mt-8 mt-6 sm:text-[20px] text-[18px]'>
              {title}
            </p>
            <p className='font-medium sm:mt-1 mt-1 text-gray-500 sm:text-[15px] text-[12px]'>
              ({category})
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
              onClick={() => {
                if (usercomment.length > 0) {
                  handlePostClick();
                }
              }}
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
                    // username={"max"}
                    fullname={userComment.name}
                    id={userComment.comId}
                    ideaID={ideaID}
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
      <ToastContainer />
    </>
  );
};

export default IdeaDescription;
