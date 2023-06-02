import React, { useState, useEffect, useContext, useRef } from "react";
import image from "../../assets/upload.png";
import border from "../../assets/Rectangle 21.png";
import image1 from "../../assets/Rectangle 23.png";
import image2 from "../../assets/Rectangle 24.png";
import image3 from "../../assets/Rectangle 25.png";
import image4 from "../../assets/Rectangle 26.png";
import image5 from "../../assets/Rectangle 27.png";
import image6 from "../../assets/Rectangle 28.png";
import image7 from "../../assets/Rectangle 29.png";
import Axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import FormData from "form-data";
import { IdeasContext } from "../../Context/IdeasContext";

export default function Modal({ setShowModal }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { ideas, setIdeas } = useContext(IdeasContext);
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const handleFile = (e) => {
    // console.log(e.target.files)
    setFiles([...files, ...e.target.files]);
  };

  const publish = () => {
    if (title && description && category) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("data", files[i]);
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
          alert("Uploaded");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Fill details");
    }

    setTitle("");
    setCategory("");
    setDescription("");
    setShowModal(false);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none overflow-y-hidden">
        <div className="relative w-[700px] my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold text-gray-400 font-mono">
                Share your idea
              </h3>
              <div>
                <button
                  className="p-2 px-4 bg-black text-white rounded-md mr-8"
                  onClick={publish}
                >
                  Publish
                </button>
              </div>
            </div>
            {/*body*/}
            <div className=" flex p-6 flex-auto">
              <div className="ml-4  grid  p-4">
                <img src={border} className="w-56 h-56 absolute z-10" />
                <div className="m-auto ml-12 mt-10">
                  <img src={image} className="w-14 h-14 absolute z-0 ml-6" />
                </div>
              </div>

              <div className="mt-40  z-10 ml-1">
                <label className="border  border-violet-500 cursor-pointer rounded-xl p-2 text-violet-500 hover:bg-violet-400  hover:text-white ">
                  browse
                  <input
                    type="file"
                    multiple="multiple"
                    onChange={handleFile}
                    className="hidden cursor-pointer"
                  />
                </label>
              </div>

              <div className="grid grid-cols-3 px-4 gap-x-2 gap-y-2 ml-24">
                <img src={image1} className="w-28 h-20" />
                <img src={image2} className="w-28 h-20" />
                <img src={image3} className="w-28 h-20" />
                <img src={image4} className="w-28 h-20" />
                <img src={image5} className="w-28 h-20" />
                <img src={image6} className="w-28 h-20" />
                <img src={image7} className="w-28 h-20" />
              </div>
            </div>
            <div className="grid place-items-center">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                // ref={titleRef}
                type="text"
                className="w-[500px] py-2 m-auto bg-gray-200 outline-none mt-6 placeholder:pl-4"
                placeholder="title"
              />
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                className="w-[500px] py-2 m-auto bg-gray-200 outline-none mt-6 placeholder:pl-4"
                placeholder="category"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                class="resize-none   bg-gray-200 outline-none placeholder:pl-4 rounded-md w-[500px] mt-4 mb-10 "
                placeholder="description"
              ></textarea>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
