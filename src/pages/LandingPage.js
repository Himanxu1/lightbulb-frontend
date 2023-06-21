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
    console.log("sc")
    const element = document.getElementById('section-1');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
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
        className='flex mx-12 w-[1260px] mt-10 h-[420px]'
        style={{
          background:
            "linear-gradient(109.52deg, rgba(140, 100, 255, 0.010109) 23.62%, rgba(144, 105, 255, 0) 23.62%, rgba(66, 0, 255, 0.21) 105.39%, rgba(144, 105, 255, 0.21) 111.72%)",
        }}
      >
        <div className='grid'>
          <h1 className='text-6xl font-bold bg-gradient-to-r  from-purple-300 via-purple-500 to-purple-600 text-transparent bg-clip-text mt-20 w-96 ml-16'  >
            Explore <br />
            <h1 className='mt-2'>Startup Ideas</h1>
          </h1>
          <div className='ml-16 space-x-4'>
            <button
              className='bg-violet-500  rounded-3xl py-3 text-white font-medium px-6 hover:text-violet-500 border-2 hover:border-violet-400 hover:bg-transparent '
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
            <button className='border-2 rounded-3xl p-2 border-violet-500 text-violet-500 font-medium hover:bg-violet-500 hover:text-white' onClick={handleClickScroll}>
              explore Ideas
            </button>
          </div>
        </div>
        <img src={BannerImage} className='ml-[400px] w-[420px] h-[420px] ' />
      </div>

      <div className=' mx-12  mt-20 '>
        <div className='flex justify-between'>
          <h1 className='font-bold text-2xl'>Featured Ideas</h1>
          <div>
            <Link className=''>
              <h1 className='mr-2 text-xl border-b-2  border-gray-500'>
                view all featured ideas
              </h1>
            </Link>
          </div>
        </div>
        {/* FeatureIdeaCard */}
        <div className='flex mb-20 space-x-14 scrollbar-hide  mt-10 overflow-x-scroll '>
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
      <div className=' mx-12  mt-20 ' >
        <div className='flex justify-between'>
          <h1 className='font-bold text-2xl' id="section-1" >Explore Ideas</h1>
          <div className='flex items-center'>
            <AiFillCaretDown className='text-[25px] mt-2 mr-2' />
            <Link>
              <h1 className='mr-2 text-xl'>show tags</h1>
            </Link>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-y-14 gap-x-32 mb-20  mt-10 '>
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
