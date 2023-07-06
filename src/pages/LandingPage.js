import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ExploreIdeaCard from "../components/ExploreIdeaCard/ExploreIdeaCard";
import imageUrl from "../assets/Group 6.png";
import image2 from "../assets/Group 16.png";
import image3 from "../assets/Cactus 2 by Streamlinehq.png";
import image4 from "../assets/Ram by Streamlinehq.png";
import FeatureIdeaCard from "../components/FeatureIdeaCard/FeatureIdeaCard";
import BannerImage from "../assets/landingImage.png";
import { AiFillCaretDown } from "react-icons/ai";
import Modal from "../components/Modal/Modal";
import { IdeasContext } from "../Context/IdeasContext";
import { AuthContext } from "../Context/AuthContext";
import { VouchContext } from "../Context/VouchContext";

// for notifivation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { ideas, setIdeas } = useContext(IdeasContext);
  // const [ideas, setIdeas] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { vouchedData } = useContext(VouchContext);
  const [isVouched, setIsVouched] = useState(false);

  // scroll to explore
  const handleClickScroll = () => {
    console.log("sc");
    const element = document.getElementById("section-1");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  //------- if no user ---------
  // useEffect(() => {
  //   if (currentUser && !currentUser.uid) {
  //     Navigate("/");
  //   }
  // }, [currentUser]);

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

  const addIdea = () => {
    if (currentUser) {
      setShowModal(true);
    } else {
      alert("Please sign in first.");
    }
  };

  const newIdeas = ideas
    .sort((a, b) => b.vouches.length - a.vouches.length)
    .slice(0, 5);

  return (
    <div className='mb-28'>
      <div
        className='relative flex flex-col sm:flex-row  w-full '
        style={{
          background:
            "linear-gradient(109.52deg, rgba(140, 100, 255, 0.010109) 23.62%, rgba(144, 105, 255, 0) 23.62%, rgba(66, 0, 255, 0.21) 105.39%, rgba(144, 105, 255, 0.21) 111.72%)",
        }}
      >
        <div className='grid w-1/2  sm:mx-auto  lg:pl-14 pl-12'>
          <h1 className=' mt-12 sm:mt-20 sm:w-96 w-64 sm:ml-16 lg:text-6xl text-4xl font-bold bg-gradient-to-r from-purple-300 via-purple-500 to-purple-600 text-transparent bg-clip-text'>
            Explore <br />
            <p className='mt-2'>Startup Ideas</p>
          </h1>
          <div className='sm:ml-16 mt-9 sm:mt-0 space-x-4'>
            <button
              className='bg-violet-500  rounded-3xl py-3 text-sm sm:text-base text-white font-medium px-6 hover:text-violet-500 border-2 hover:border-violet-400 hover:bg-transparent '
              onClick={() => addIdea()}
            >
              add yours
            </button>
            {/* Modal Compoenent */}
            {showModal && (
              <div className='fixed w-full top-20 -left-4 z-50'>
                <Modal
                  setShowModal={setShowModal}
                  successNotify={successNotify}
                  errNotify={errNotify}
                />
              </div>
            )}
            <button
              className='border-2 rounded-3xl p-2  text-sm sm:text-base border-violet-500 text-violet-500 font-medium hover:bg-violet-500 hover:text-white'
              onClick={handleClickScroll}
            >
              explore Ideas
            </button>
          </div>
        </div>
        <img
          src={BannerImage}
          className='mx-auto lg:w-[420px] md:w-[290px] w-[250px] lg:h-[420px] md:h-[290px] h-[250px]'
        />
      </div>

      <div className=' sm:mx-12 mx-4 md:mt-20 sm:mt-10 mt-6'>
        <div className='flex justify-between'>
          <h1 className='font-bold lg:text-2xl md:text-xl text-lg'>
            Featured Ideas
          </h1>
          <div>
            <Link className=''>
              <h1 className='mr-2 lg:text-xl md:text-lg text-base border-b-2  border-gray-500'>
                view all featured ideas
              </h1>
            </Link>
          </div>
        </div>
        {/* FeatureIdeaCard */}
        {!newIdeas.length ? (
          <div className='w-full text-center'>Loading...</div>
        ) : (
          <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-10 '>
            {newIdeas.map((idea, key) => {
              return (
                <FeatureIdeaCard
                  noofvouches={idea.vouches.length}
                  category={idea.category}
                  userPhotoUrl={idea.userPhotoUrl}
                  userId={idea.userID}
                  title={idea.title}
                  description={idea.description}
                  imageUrl={imageUrl}
                  id={idea._id}
                  key={idea._id}
                  ideaId={idea.ideaID}
                  setIdeas={setIdeas}
                  successNotify={successNotify}
                  errNotify={errNotify}
                />
              );
            })}
          </div>
        )}
      </div>
      {/* Explore Ideas */}
      <div className='sm:mx-12 mx-4 md:mt-20 sm:mt-10 mt-6 '>
        <div className='flex justify-between'>
          <h1
            className='font-bold  lg:text-2xl md:text-xl text-lg'
            id='section-1'
          >
            Explore Ideas
          </h1>
          <div className='flex items-center'>
            <Link>
              <h1 className='mr-2 lg:text-xl md:text-lg text-base'>
                show tags
              </h1>
            </Link>
            <AiFillCaretDown className='lg:text-[20px] md:text-[18px] mt-2' />
          </div>
        </div>

        {/* card 1 */}
        {!ideas.length ? (
          <div className='w-full text-center'>Loading...</div>
        ) : (
          <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-10 '>
            {ideas.reverse().map((idea, key) => {
              return (
                <>
                  <ExploreIdeaCard
                    noofvouches={idea.vouches.length}
                    category={idea.category}
                    userPhotoUrl={idea.userPhotoUrl}
                    userId={idea.userID}
                    title={idea.title}
                    description={idea.description}
                    imageUrl={imageUrl}
                    id={idea._id}
                    key={idea._id}
                    ideaId={idea.ideaID}
                    setIdeas={setIdeas}
                    successNotify={successNotify}
                    errNotify={errNotify}
                  />
                </>
              );
            })}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default LandingPage;
