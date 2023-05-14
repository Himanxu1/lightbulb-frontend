import React, { useContext, useEffect, useState } from "react";
import Axios from 'axios';
import { AuthContext } from "../../Context/AuthContext";
import ProfileIdeaCard from "../ProfileIdeaCard/ProfileIdeaCard";
import image4 from '../../assets/Group 16.png'
import Modal from "../Modal/Modal";


const CreatedCard = () => {

  const {currentUser} = useContext(AuthContext);
  const [created,setCreated] = useState([])
  const [loading,setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [showDelete,setShowDelete] = useState(true)

  //  console.log(currentUser)

  useEffect(()=>{
    Axios.get(`http://lightbulb-server-env.eba-je399ubq.ap-south-1.elasticbeanstalk.com/api/ideas/user?userID=${currentUser.uid}`).then((res)=>{
      // console.log(res.data.data)
      setCreated(res.data.data)
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
    })
  },[loading])

  return(
    <>

{created.length == 0 && <div className="grid justify-center mt-10">
   <h1 className="font-bold text-xl">Share your Idea</h1>
   <button className="bg-violet-500 mt-10 rounded-3xl py-3 text-white font-medium px-6 hover:text-violet-500 border-2 hover:border-violet-400 hover:bg-transparent "
              onClick={() => setShowModal(true)} >
              add yours
            </button>
      {/* Modal Compoenent */}
      {showModal && <Modal setShowModal={setShowModal} />}
  </div>}
<div className="mx-60 grid grid-cols-2 mt-20 gap-x-14 gap-y-10 pb-20">
{loading && <h1>Loading</h1>}
    {
     created.map((item)=>{
      return (
        <ProfileIdeaCard 
         id={item._id}
        title={item.title}
        description={item.description}
        imageUrl={image4}
        key={item.userID}
        showDelete={showDelete}
        />
      )
     })
   }
  
  
</div>
    </>


  )
  
};

export default CreatedCard;
