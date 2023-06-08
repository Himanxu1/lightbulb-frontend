import React, { useState, useEffect, useContext, useRef } from "react";
import image from "../../assets/upload.png";
import Axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import FormData from "form-data";
import { IdeasContext } from "../../Context/IdeasContext";
import { IoStorefrontOutline } from "react-icons/io5";
// for notifivation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { upload } from "@testing-library/user-event/dist/upload";
import { useLoaderData } from "react-router-dom";

export default function Modal({ setShowModal, successNotify }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { ideas, setIdeas } = useContext(IdeasContext);
  const base_url = process.env.REACT_APP_BACKEND_URL;

  //----------- notification -------------
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

  const handleFile = (e) => {
    setUploadedImages([...uploadedImages, ...e.target.files]);
  };

  const publish = () => {
    if (title && description && category) {
      const formData = new FormData();

      for (let i = 0; i < uploadedImages.length; i++) {
        formData.append("data", uploadedImages[i]);
      }

      formData.append("userID", currentUser.uid);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);

      const option = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      Axios.post(`${base_url}/api/ideas/save`, formData, option)
        .then((res) => {
          setIdeas([...ideas, res.data.response_data.data]);
          console.log(res.data.response_data.data);
          // successNotify("Uploaded");
          setShowModal(false);
          setTitle("");
          setCategory("");
          setDescription("");
          successNotify("Uploaded");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (!title) {
        errNotify("Enter Title");
      }
      if (!description) {
        errNotify("Enter Description");
      }
      if (!category) {
        errNotify("Enter Category");
      }
    }
  };

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none overflow-y-hidden'>
        <div className='relative w-[700px] my-6 mx-auto max-w-3xl'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
              <h3 className='text-xl font-semibold text-gray-400 font-mono'>
                Share your idea
              </h3>
              <div>
                <button
                  className='p-2 px-4 bg-black text-white rounded-md mr-8'
                  onClick={publish}
                >
                  Publish
                </button>
              </div>
            </div>
            {/*body*/}
            <div className=' flex p-4 flex-auto'>
              <div className='ml-8 w-48 h-48 border gap-5 border-2 rounded-3xl flex flex-col justify-center items-center border-violet-300 border-dashed'>
                <img src={image} className='w-14 h-14 z-0' />
                <label className='w-20 text-center border border-violet-500 cursor-pointer rounded-xl p-2 text-violet-500 hover:bg-violet-400  hover:text-white'>
                  browse
                  <input
                    type='file'
                    multiple='multiple'
                    onChange={handleFile}
                    className='hidden cursor-pointer'
                  />
                </label>
              </div>

              <div className='grid grid-cols-3 px-4 gap-x-2 gap-y-2 ml-16'>
                {/*----------- Rendering browsed images -----------*/}
                {uploadedImages.map((idea, index) => (
                  <img
                    src={URL.createObjectURL(idea)}
                    alt=''
                    key={index}
                    className='w-28 h-20 object-cover object-center rounded-xl'
                  />
                ))}
              </div>
            </div>
            <div className='grid place-items-center'>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                // ref={titleRef}
                type='text'
                className='w-[500px] py-2 m-auto bg-gray-200 outline-none mt-4 pl-4'
                placeholder='title'
              />
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type='text'
                className='w-[500px] py-2 pl-4 m-auto bg-gray-200 outline-none mt-4 pl-4'
                placeholder='category'
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='resize bg-gray-200 outline-none pl-4 py-2 rounded-md w-[500px] min-w-[500px] max-w-[500px] min-h-[100px] max-h-[150px] mt-4 mb-10'
                placeholder='description'
              ></textarea>
            </div>
            {/*footer*/}
            <div className='flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b'>
              <button
                className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
      <ToastContainer />
    </>
  );
}
