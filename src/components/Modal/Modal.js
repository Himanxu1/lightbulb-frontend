import React, { useState, useEffect, useContext, useRef } from "react";
import image from "../../assets/upload.png";
import Axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import FormData from "form-data";
import { IdeasContext } from "../../Context/IdeasContext";
import { IoStorefrontOutline } from "react-icons/io5";
import { upload } from "@testing-library/user-event/dist/upload";
import { useLoaderData } from "react-router-dom";

export default function Modal({ setShowModal, successNotify, errNotify }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { ideas, setIdeas } = useContext(IdeasContext);
  const base_url = process.env.REACT_APP_BACKEND_URL;

  const handleFile = (e) => {
    setUploadedImages([...uploadedImages, ...e.target.files]);
  };

  const publish = () => {
    if (title && description && category) {
      const formData = new FormData();

      for (let i = 0; i < uploadedImages.length; i++) {
        formData.append("data", uploadedImages[i]);
      }
      formData.append("userPhotoUrl", currentUser.photoURL);
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
    <div className='relative z-10'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      {/* <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none overflow-y-hidden'> */}
      <div className='relative w-11/12 my-6 mx-auto'>
        {/*content*/}
        <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
          {/*header*/}
          <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
            <h3 className='my-auto md:text-xl sm:text-lg font-semibold text-gray-400 font-mono'>
              Share your idea
            </h3>
            <div>
              <button
                className='p-2 px-4 bg-black text-white text-sm sm:text-base rounded-md mr-8'
                onClick={publish}
              >
                Publish
              </button>
            </div>
          </div>
          {/*body*/}
          <div className=' flex p-4 flex-auto'>
            <div className='w-1/3 sm:ml-8 md:w-48 sm:w-40 w-36 md:h-36 sm:h-36 h-28 sm:p- p-2 border gap-5 border-2 rounded-3xl flex flex-col justify-center items-center border-violet-300 border-dashed'>
              <img src={image} className='md:w-12  w-7 md:h-12  h-7 z-0' />
              <label className='ms:w-20 text-center text-sm sm:text-base border border-violet-500 cursor-pointer rounded-xl p-2 text-violet-500 hover:bg-violet-400  hover:text-white'>
                browse
                <input
                  type='file'
                  multiple='multiple'
                  onChange={handleFile}
                  className='hidden cursor-pointer'
                />
              </label>
            </div>

            <div className='w-full  mx-4 flex flex-wrap '>
              {/*----------- Rendering browsed images -----------*/}
              {uploadedImages.map((idea, index) => (
                <img
                  src={URL.createObjectURL(idea)}
                  alt=''
                  key={index}
                  className='md:w-28 sm:w-20 w-16 md:h-20 sm:h-20 h-16 object-cover object-center rounded-xl'
                />
              ))}
            </div>
          </div>
          <div className='w-11/12 md:text-base text-sm  mx-auto grid place-items-center'>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              className='w-full py-2 m-auto bg-gray-200 rounded-md outline-none mt-4 pl-4'
              placeholder='One liner idea'
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full py-2 pl-4 m-auto bg-gray-200 rounded-md outline-none mt-4 ${
                category === "" ? "text-gray-400" : "text-black"
              }`}
            >
              <option value='' disabled>
                Select a category
              </option>
              <option className='text-black' value='SaaS'>
                SaaS
              </option>
              <option className='text-black' value='E-commerce'>
                E-commerce
              </option>
              <option className='text-black' value='Health and Wellness'>
                Health and Wellness
              </option>
              <option className='text-black' value='Ed-tech'>
                Ed-tech
              </option>
              <option className='text-black' value='Fintech'>
                Fintech
              </option>
              <option className='text-black' value='Sustainability'>
                Sustainability
              </option>
              <option className='text-black' value='Entertainment and Media'>
                Entertainment and Media
              </option>
              <option className='text-black' value='Food and Beverage'>
                Food and Beverage
              </option>
              <option className='text-black' value='Travel and Hospitality'>
                Travel and Hospitality
              </option>
              <option className='text-black' value='Fashion and Apparel'>
                Fashion and Apparel
              </option>
              <option className='text-black' value='Real Estate and Property'>
                Real Estate and Property
              </option>
              <option
                className='text-black'
                value='Automotive and Transportation'
              >
                Automotive and Transportation
              </option>
              <option className='text-black' value='Arts and Culture'>
                Arts and Culture
              </option>
              <option className='text-black' value='Sports and Fitness'>
                Sports and Fitness
              </option>
              <option className='text-black' value='Home and Lifestyle'>
                Home and Lifestyle
              </option>
            </select>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='resize-y bg-gray-200 outline-none pl-4 py-2 rounded-md min-w-full min-h-[100px] max-h-[150px] mt-4 mb-10'
              placeholder='Problem-solution statement'
            ></textarea>
          </div>

          {/*footer*/}
          <div className='flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b'>
            <button
              className='text-red-500 text-sm sm:text-base background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              type='button'
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* <div className='opacity-25 fixed inset-0 z-40 bg-black'></div> */}
    </div>
  );
}
