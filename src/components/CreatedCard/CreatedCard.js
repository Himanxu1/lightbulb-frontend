import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import ProfileIdeaCard from "../ProfileIdeaCard/ProfileIdeaCard";
import image4 from "../../assets/Group 16.png";
import Modal from "../Modal/Modal";

// for notifivation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatedCard = ({ stranger, id }) => {
  const { currentUser } = useContext(AuthContext);
  const [created, setCreated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const base_url = process.env.REACT_APP_BACKEND_URL;

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

  useEffect(() => {
    if (stranger) {
      Axios.get(`${base_url}/api/ideas/user?userID=${id}`)
        .then((res) => {
          setCreated(res.data.data);
          setLoading(false);
          // console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.get(`${base_url}/api/ideas/user?userID=${currentUser.uid}`)
        .then((res) => {
          setCreated(res.data.data);
          setLoading(false);
          // console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [stranger]);

  const addIdea = () => {
    if (currentUser) {
      navigate("/AddIdea", { state: { prevPath: location.pathname } });
    } else {
      alert("Please sign in first.");
    }
  };

  return (
    <>
      {!stranger && created.length === 0 && (
        <div className="grid justify-center mt-10">
          <h1 className="font-bold text-xl">Share your Idea</h1>
          <button
            className="bg-violet-500 mt-10 rounded-3xl py-3 text-white font-medium px-6 hover:text-violet-500 border-2 hover:border-violet-400 hover:bg-transparent "
            onClick={addIdea}
          >
            add yours
          </button>
          {/* Modal Compoenent */}
          {/* {showModal && (
            <Modal setShowModal={setShowModal} successNotify={successNotify} />
          )} */}
        </div>
      )}
      {/* <div className='flex justify-center items-center'> */}
      {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center mt-10 gap-5"> */}
      <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 xl:gap-12 gap-7 mt-10 ">
        {loading && <h1>Loading</h1>}
        {created.reverse().map((item) => {
          return (
            <ProfileIdeaCard
              key={item._id}
              id={item._id}
              title={item.title}
              description={item.description}
              ideaID={item.ideaID}
              userPhotoUrl={item.userPhotoUrl}
              imageUrl={image4}
              showDelete={showDelete}
              setCreated={setCreated}
              created={created}
              stranger={stranger}
            />
          );
        })}
      </div>
      {/* </div> */}
      <ToastContainer />
    </>
  );
};

export default CreatedCard;
