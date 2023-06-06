import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import ProfileIdeaCard from "../ProfileIdeaCard/ProfileIdeaCard";
import image4 from "../../assets/Group 16.png";
import Modal from "../Modal/Modal";

const CreatedCard = () => {
  const { currentUser } = useContext(AuthContext);
  const [created, setCreated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(true);

  const base_url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    Axios.get(`${base_url}/api/ideas/user?userID=${currentUser.uid}`)
      .then((res) => {
        setCreated(res.data.data);
        setLoading(false);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);

  return (
    <>
      {created.length === 0 && (
        <div className='grid justify-center mt-10'>
          <h1 className='font-bold text-xl'>Share your Idea</h1>
          <button
            className='bg-violet-500 mt-10 rounded-3xl py-3 text-white font-medium px-6 hover:text-violet-500 border-2 hover:border-violet-400 hover:bg-transparent '
            onClick={() => setShowModal(true)}
          >
            add yours
          </button>
          {/* Modal Compoenent */}
          {showModal && <Modal setShowModal={setShowModal} />}
        </div>
      )}
      <div className='flex justify-center items-center'>
        <div className='grid grid-cols-2 mt-10 gap-5'>
          {loading && <h1>Loading</h1>}
          {created.map((item) => {
            return (
              <ProfileIdeaCard
                key={item._id}
                id={item._id}
                title={item.title}
                description={item.description}
                imageUrl={item.images[0]}
                showDelete={showDelete}
                setCreated={setCreated}
                created={created}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CreatedCard;
