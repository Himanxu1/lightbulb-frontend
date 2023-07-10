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
  const [exploreIdeas, setExploreIdeas] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { vouchedData } = useContext(VouchContext);
  const [isVouched, setIsVouched] = useState(false);

  const [selectedTag, setSelectedTag] = useState(null);
  const [showTags, setShowTags] = useState(false);

  useEffect(() => {
    setExploreIdeas(ideas);
  }, [ideas]);

  const tags = [
    "SaaS",
    "E-commerce",
    "Health & Wellness",
    "Ed-tech",
    "Fintech",
    "Sustainability",
    "Entertainment & Media",
    "Food & Beverage",
    "Travel & Hospitality",
    "Fashion & Apparel",
    "Real Estate & Property",
    "Automotive & Transportation",
    "Arts & Culture",
    "Sports & Fitness",
    "Home & Lifestyle",
  ];

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setShowTags(false);
  };

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
            className='font-bold lg:text-2xl md:text-xl text-lg'
            id='section-1'
          >
            Explore Ideas
          </h1>
          <div className='relative'>
            <button
              onClick={() => setShowTags(!showTags)}
              className='flex items-center focus:outline-none'
            >
              <h1 className='mr-2 lg:text-xl md:text-lg text-base'>
                show tags
              </h1>
              <AiFillCaretDown className='lg:text-[20px] md:text-[18px] mt-2' />
            </button>
            <>
              {selectedTag && (
                <div className='text-gray-400'>{selectedTag}</div>
              )}
            </>
            {showTags && (
              <div className='absolute z-50 md:w-[600px] sm:w-[500px] w-[300px] top-7 right-0 bg-white shadow rounded-md py-2 grid sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2'>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className='text-left md:w-44 sm:w-40 sm:text-base text-sm px-4 py-2 hover:bg-gray-200 focus:outline-none'
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* card 1 */}
        {!exploreIdeas.length ? (
          <div className='w-full text-center'>Loading...</div>
        ) : (
          <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-10 '>
            {exploreIdeas.map((idea, key) => {
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
