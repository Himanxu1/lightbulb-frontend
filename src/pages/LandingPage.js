import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import ExploreIdeaCard from "../components/ExploreIdeaCard/ExploreIdeaCard";
import imageUrl from '../assets/Group 6.png'
import image2 from '../assets/Group 16.png'
import image3 from '../assets/Cactus 2 by Streamlinehq.png'
import image4 from '../assets/Ram by Streamlinehq.png'
import FeatureIdeaCard from "../components/FeatureIdeaCard/FeatureIdeaCard";
import BannerImage from '../assets/landingImage.png';
import {AiFillCaretDown} from 'react-icons/ai';

const LandingPage = () => {
  return (
    <div>
      <div
        className="flex mx-12 w-[1260px] mt-10 h-96 border border-black"
        style={{
          background:
            "linear-gradient(109.52deg, rgba(140, 100, 255, 0.010109) 23.62%, rgba(144, 105, 255, 0) 23.62%, rgba(66, 0, 255, 0.21) 105.39%, rgba(144, 105, 255, 0.21) 111.72%)",
        }}
      >
        <div className="grid">
          <h1 className="text-6xl font-bold bg-gradient-to-r  from-purple-300 via-purple-500 to-purple-600 text-transparent bg-clip-text mt-20 w-96 ml-16">
            Explore <br />
            <h1 className="mt-2">Startup Ideas</h1>
          </h1>
          <div className="ml-16 space-x-4">
            <button className="bg-violet-500  rounded-3xl py-3 text-white font-medium px-6">
              add yours
            </button>
            <button className="border-2 rounded-3xl p-2 border-violet-500 text-violet-500 font-medium">
              support Ideas
            </button>
          </div>
        </div>
        <img
          src={BannerImage}
          className="ml-[400px]"
        />
      </div>

      <div className=" mx-12  mt-20 ">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Featured Ideas</h1>
          <div>
            
          <Link className="">
            <h1 className="mr-2 text-xl border-b-2  border-gray-500">view all featured ideas</h1>
          </Link>
          
          </div>
        </div>

{/* FeatureIdeaCard */}
        <div className="flex mb-20 space-x-20 mt-10 overflow-x-auto">
          
          <FeatureIdeaCard 
            title="A plarform for token gated scheduled booking."
            description="  Admittedly, it is a surrogate experience, but so are love stories
            and travel novels. It is artificial, but not vulgar. And more
            importantly, it substantially changes Read more"
            imageUrl={imageUrl}
          />

          <FeatureIdeaCard 
            title="A plarform for token gated scheduled booking."
            description="  Admittedly, it is a surrogate experience, but so are love stories
            and travel novels. It is artificial, but not vulgar. And more
            importantly, it substantially changes Read more"
            imageUrl={imageUrl}
          />

          <FeatureIdeaCard 
            title="A plarform for token gated scheduled booking."
            description="  Admittedly, it is a surrogate experience, but so are love stories
            and travel novels. It is artificial, but not vulgar. And more
            importantly, it substantially changes Read more"
            imageUrl={imageUrl}
          />

        </div>
      </div>

{/* Explore Ideas */}
      <div className=" mx-12  mt-20 ">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Explore Ideas</h1>
          <div className="flex items-center">
<AiFillCaretDown className="text-[25px] mt-2 mr-2"/>
          <Link>
            <h1 className="mr-2 text-xl">show tags</h1>
          </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-14 gap-x-32 mb-20  mt-10 ">
        {/* card 1 */}
                  <ExploreIdeaCard 
            title=" A plarform for token gated scheduled booking."
            description=' Admittedly, it is a surrogate experience, but so are love stories
            and travel novels. It is artificial, but not vulgar. And more
            importantly, it substantially changes Read more'
            imageUrl={image2}
          />
          {/* Card 2 */}
                    <ExploreIdeaCard 
            title=" A plarform for token gated scheduled booking."
            description=' Admittedly, it is a surrogate experience, but so are love stories
            and travel novels. It is artificial, but not vulgar. And more
            importantly, it substantially changes Read more'
            imageUrl={imageUrl}
          />

          {/* card 3 */}
          <ExploreIdeaCard 
            title=" A plarform for token gated scheduled booking."
            description=' Admittedly, it is a surrogate experience, but so are love stories
            and travel novels. It is artificial, but not vulgar. And more
            importantly, it substantially changes Read more'
            imageUrl={image3}
          />
          {/* card 4 */}
          <ExploreIdeaCard 
            title=" A plarform for token gated scheduled booking."
            description=' Admittedly, it is a surrogate experience, but so are love stories
            and travel novels. It is artificial, but not vulgar. And more
            importantly, it substantially changes Read more'
            imageUrl={image4}
          />
          {/* card 5 */}

          <ExploreIdeaCard 
            title=" A plarform for token gated scheduled booking."
            description=' Admittedly, it is a surrogate experience, but so are love stories
            and travel novels. It is artificial, but not vulgar. And more
            importantly, it substantially changes Read more'
            imageUrl={imageUrl}
          />

          {/* card 6 */}
          <ExploreIdeaCard 
            title=" A plarform for token gated scheduled booking."
            description=' Admittedly, it is a surrogate experience, but so are love stories
            and travel novels. It is artificial, but not vulgar. And more
            importantly, it substantially changes Read more'
            imageUrl={imageUrl}
          />

        </div>
      </div>
    </div>
  );
};

export default LandingPage;

// background: linear-gradient(0deg, #9069FF, #9069FF),
// linear-gradient(0deg, #C3AEFF, #C3AEFF);
