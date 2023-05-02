import React from 'react'
import profileImage from '../assets/Group 6.png'
import { Link } from 'react-router-dom'
import {BsPen} from 'react-icons/bs'
import {IoBuildOutline} from 'react-icons/io5';
import {IoBulbOutline} from 'react-icons/io5'
import ExploreIdeaCard from '../components/ExploreIdeaCard/ExploreIdeaCard';
import ProfileIdeaCard from '../components/ProfileIdeaCard/ProfileIdeaCard';
import image1 from '../assets/Group 16.png'
import image2 from '../assets/Cactus 2 by Streamlinehq.png';
import image3 from '../assets/Group 6.png';
import image4 from  '../assets/Ram by Streamlinehq.png'

const Profile = () => {
  return (
    <div className='mt-20 mx-12   h-[1300px] shadow-2xl  shadow-gray-300 '>
        <div className='grid place-items-center mt-20 pt-20'>
            <img src={profileImage} className='w-28 h-28 ' />
            <h1 className='font-bold text-xl mt-4'>@foxyBoy</h1>
            <p className='text-center mx-60 mt-4 text-[18px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus enim vitae eget facilisis eget dignissim congue. Ac dolor cras arcu duis dictum. Nam venenatis diam et consequat pellentesque gravida dolor bibendum. Vehicula in bibendum quis justo.</p>
        </div>
        <div className='flex justify-center mt-14 space-x-64 font-bold text-xl '>
            <Link className='flex'>
            <h1 className='mr-2 ml-4'>Vouched</h1> 
            <IoBulbOutline className='text-[22px]'/>
            </Link>
            <Link className='flex items-center text-gray-400'>
            <h1 className=''>Created</h1> 
           
            <BsPen className='ml-2'/>
            </Link>
            <Link className='flex items-center text-gray-400 mr-4'>
            <h1 className='mr-2'>Build</h1> 
            <IoBuildOutline className='' />
            </Link>
        </div>
        <div className='h-1 bg-gray-300 mx-60 mt-1'></div>
        <div className='mx-60 grid grid-cols-2 mt-20 gap-x-14 gap-y-10'>
            <ProfileIdeaCard
             title="A plarform for token gated scheduled booking."
             description="Admittedly, it is a surrogate experience, but so are love stories and travel novels. It is artificial, but not vulgar. And more importantly, it substantially changes Read more   artificial, but not vulgar. And more importantly, it substantially changes ... Read more "
             imageUrl={image1}
            />
             <ProfileIdeaCard
             title="A plarform for token gated scheduled booking."
             description="Admittedly, it is a surrogate experience, but so are love stories and travel novels. It is artificial, but not vulgar. And more importantly, it substantially changes Read more   artificial, but not vulgar. And more importantly, it substantially changes ... Read more "
             imageUrl={image2}
            />
            <ProfileIdeaCard
             title="A plarform for token gated scheduled booking."
             description="Admittedly, it is a surrogate experience, but so are love stories and travel novels. It is artificial, but not vulgar. And more importantly, it substantially changes Read more   artificial, but not vulgar. And more importantly, it substantially changes ... Read more "
             imageUrl={image3}
            />
             <ProfileIdeaCard
             title="A plarform for token gated scheduled booking."
             description="Admittedly, it is a surrogate experience, but so are love stories and travel novels. It is artificial, but not vulgar. And more importantly, it substantially changes Read more   artificial, but not vulgar. And more importantly, it substantially changes ... Read more "
             imageUrl={image4}
            />
        </div>
    </div>
  )
}

export default Profile