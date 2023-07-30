import React, { useEffect, useState, useContext } from "react";
import { MdOutlineClose, MdExpandMore } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import FormData from "form-data";
import Axios from "axios";

import { AuthContext } from "../Context/AuthContext";
import { IdeasContext } from "../Context/IdeasContext";
// for notifivation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const base_url = process.env.REACT_APP_BACKEND_URL;

function AddIdea() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const { ideas, setIdeas } = useContext(IdeasContext);

  const [uploadedImages, setUploadedImages] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleFile = (e) => {
    setUploadedImages([...uploadedImages, ...e.target.files]);
  };

  // useEffect(() => {
  //   console.log(location.state.prevPath);
  // });

  const handleUpload = () => {
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
          successNotify("Uploaded");
          // setShowModal(false);
          setTitle("");
          setCategory("");
          setDescription("");
          // successNotify("Uploaded");
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(formData);
      // setTitle("");
      // setCategory("");
      // setDescription("");
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

  const handleExit = () => {
    navigate(location.state.prevPath);
  };

  return (
    <div className="mb-36">
      <div className="flex justify-between items-center  sm:w-10/12 w-11/12 mx-auto">
        <h3 className="md:py-5 sm:py-3 py-2 my-auto md:text-2xl sm:text-xl text-lg  font-semibold text-gray-500">
          Share your idea
        </h3>
        <button onClick={handleExit}>
          <MdOutlineClose className="md:text-4xl sm:text-3xl text-2xl text-gray-700" />
        </button>
      </div>
      <div className="h-[1.3px] bg-gray-300"></div>
      <div className="md:my-7 sm:w-10/12 w-11/12 mx-auto">
        {/*------ media input -------*/}
        <div className="flex md:flex-row flex-col justify-between md:my-14 sm:my-8 my-4">
          <h3 className="py-2 md:text-xl sm:text-lg font-medium text-black  ">
            Media
          </h3>
          {uploadedImages == 0 ? (
            <div class="flex justify-center items-center md:w-4/6 h-[200px] md:text-xl sm:text-lg text-gray-500 rounded-xl border-2 border-gray-300 border-dashed bg-violet-50">
              <div>
                Drag & drop an image or{" "}
                <label className="text-violet-600">
                  Browse
                  <input
                    type="file"
                    multiple="multiple"
                    onChange={handleFile}
                    className="hidden cursor-pointer"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="flex justify-center md:w-4/6">
              <div className="flex flex-wrap gap-x-4 gap-y-5 px-4">
                <div>
                  <label className="text-violet-600">
                    <div class="flex justify-center items-center md:w-28 sm:w-20 w-16 md:h-24 sm:h-20 h-16 px-4 text-center text-4xl text-violet-600 rounded-xl border-2 border-gray-300 border-dashed bg-violet-50">
                      <AiOutlineFileAdd />
                    </div>
                    <input
                      type="file"
                      multiple="multiple"
                      onChange={handleFile}
                      className="hidden cursor-pointer"
                    />
                  </label>
                </div>
                {uploadedImages.map((idea, index) => (
                  <img
                    src={URL.createObjectURL(idea)}
                    alt=""
                    key={index}
                    // className="md:w-32 md:h-28 object-cover object-center rounded-xl"
                    className="md:w-28 sm:w-20 w-16 md:h-24 sm:h-20 h-16 object-cover object-center rounded-xl"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {/*------ break line -------*/}
        <div className="h-[1.3px] bg-gray-300"></div>
        {/*------  One Line Idea input -------*/}
        <div className="flex md:flex-row flex-col justify-between mmd:my-14 sm:my-8 my-4">
          <h3 className="py-2 md:text-xl sm:text-lg font-medium text-black  ">
            One Line Idea
          </h3>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="md:w-4/6 py-3 md:text-xl sm:text-lg bg-gray-50 rounded-lg border-2 border-gray-600 placeholder:text-gray-400 outline-none pl-4"
            placeholder="Explain your idea in one line"
          />
        </div>
        {/*------ break line -------*/}
        <div className="h-[1.3px] bg-gray-300"></div>
        {/*------  Category input -------*/}
        <div className="flex md:flex-row flex-col justify-between md:my-14 sm:my-8 my-4">
          <h3 className="py-2 md:text-xl sm:text-lg font-medium text-black  ">
            Category
          </h3>
          <div className="flex justify-between md:w-4/6 md:text-xl sm:text-lg bg-gray-50 rounded-lg border-2 border-gray-600 placeholder:text-gray-400">
            {/* <p className=" py-3 text-gray-500">
              Select the industry in which your idea fits the best
            </p>
            <MdExpandMore className="text-4xl my-auto" /> */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full mx-4 py-3 bg-gray-50 rounded-md outline-none ${
                category === "" ? "text-gray-400" : "text-black"
              }`}
            >
              <option value="" disabled>
                Select the industry in which your idea fits the best
              </option>
              <option className="text-black" value="SaaS">
                SaaS
              </option>
              <option className="text-black" value="E-commerce">
                E-commerce
              </option>
              <option className="text-black" value="Health and Wellness">
                Health and Wellness
              </option>
              <option className="text-black" value="Ed-tech">
                Ed-tech
              </option>
              <option className="text-black" value="Fintech">
                Fintech
              </option>
              <option className="text-black" value="Sustainability">
                Sustainability
              </option>
              <option className="text-black" value="Entertainment and Media">
                Entertainment and Media
              </option>
              <option className="text-black" value="Food and Beverage">
                Food and Beverage
              </option>
              <option className="text-black" value="Travel and Hospitality">
                Travel and Hospitality
              </option>
              <option className="text-black" value="Fashion and Apparel">
                Fashion and Apparel
              </option>
              <option className="text-black" value="Real Estate and Property">
                Real Estate and Property
              </option>
              <option
                className="text-black"
                value="Automotive and Transportation"
              >
                Automotive and Transportation
              </option>
              <option className="text-black" value="Arts and Culture">
                Arts and Culture
              </option>
              <option className="text-black" value="Sports and Fitness">
                Sports and Fitness
              </option>
              <option className="text-black" value="Home and Lifestyle">
                Home and Lifestyle
              </option>
            </select>
          </div>
        </div>
        {/*------ break line -------*/}
        <div className="h-[1.3px] bg-gray-300"></div>
        {/*------  Problem Statement input -------*/}
        <div className="flex md:flex-row flex-col justify-between mmd:my-14 sm:my-8 my-4">
          <h3 className="py-2 md:text-xl sm:text-lg font-medium text-black  ">
            Problem Statement{" "}
          </h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className=" md:w-4/6 py-3 min-h-[150px] max-h-[300px] md:text-xl sm:text-lg bg-gray-50 rounded-lg border-2 border-gray-600 placeholder:text-gray-400 outline-none pl-4"
            placeholder="Explain the problem statement in detail."
          />
        </div>
        {/*------ break line -------*/}
        <div className="h-[1.3px] bg-gray-300"></div>
        {/*------  buttons -------*/}
        <div className="flex sm:gap-8 gap-4 justify-end md:my-8 my-4">
          <button
            onClick={handleExit}
            className="py-3 sm:px-8 px-3 md:text-xl sm:text-lg text-sm font-semibold rounded-lg border-2 border-gray-400"
          >
            Discard Idea
          </button>
          <button
            className="py-3 sm:px-8 px-3 md:text-xl sm:text-lg text-sm text-white bg-black  font-semibold rounded-lg border-2 border-gray-400"
            onClick={handleUpload}
          >
            Upload to the Community
          </button>
        </div>
      </div>{" "}
      <ToastContainer />
    </div>
  );
}

export default AddIdea;
