import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
  const { currentUser } = useContext(AuthContext);
  const { vouchedData } = useContext(VouchContext);
  const [isVouched, setIsVouched] = useState(false);
  // const ref = useRef(null)
  // scroll to explore
  const handleClickScroll = () => {
    console.log("sc");
    const element = document.getElementById("section-1");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  const newIdeas = ideas.slice(0, 5);
  return (
    <div>
      <div
        className='flex flex-col sm:flex-row  w-full '
        style={{
          background:
            "linear-gradient(109.52deg, rgba(140, 100, 255, 0.010109) 23.62%, rgba(144, 105, 255, 0) 23.62%, rgba(66, 0, 255, 0.21) 105.39%, rgba(144, 105, 255, 0.21) 111.72%)",
        }}
      >
        <div className='grid w-1/2  sm:mx-auto  lg:pl-14 pl-12'>
          <h1 className=' mt-12 sm:mt-20 w-96 sm:ml-16 lg:text-6xl text-4xl font-bold bg-gradient-to-r from-purple-300 via-purple-500 to-purple-600 text-transparent bg-clip-text'>
            Explore <br />
            <p className='mt-2'>Startup Ideas</p>
          </h1>
          <div className='sm:ml-16 mt-9 sm:mt-0 space-x-4'>
            <button
              className='bg-violet-500  rounded-3xl py-3 text-sm sm:text-base text-white font-medium px-6 hover:text-violet-500 border-2 hover:border-violet-400 hover:bg-transparent '
              onClick={() => setShowModal(true)}
            >
              add yours
            </button>
            {/* Modal Compoenent */}
            {showModal && (
              <Modal
                setShowModal={setShowModal}
                successNotify={successNotify}
                errNotify={errNotify}
              />
            )}
            <button
              className='border-2 rounded-3xl p-2  text-sm sm:text-base border-violet-500 text-violet-500 font-medium hover:bg-violet-500 hover:text-white'
              onClick={handleClickScroll}
            >
              explore Ideas
            </button>
          </div>
        </div>
        {/* <div className=''> */}
        <img
          src={BannerImage}
          className='mx-auto lg:w-[420px] md:w-[290px] w-[250px] lg:h-[420px] md:h-[290px] h-[250px]'
        />
        {/* </div> */}
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
        {/* <div className='flex mb-20 space-x-14 scrollbar-hide  mt-10 overflow-x-scroll '> */}
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-10 '>
          {newIdeas.map((idea, key) => {
            return (
              <FeatureIdeaCard
                noofvouches={idea.vouches.length}
                category={idea.category}
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

        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-10 '>
          {/* card 1 */}
          {ideas.map((idea, key) => {
            return (
              <>
                <ExploreIdeaCard
                  noofvouches={idea.vouches.length}
                  category={idea.category}
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default LandingPage;
