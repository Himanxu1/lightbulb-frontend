import React from "react";
import image from "../../assets/upload.png";
import border from "../../assets/Rectangle 21.png";
import image1 from "../../assets/Rectangle 23.png";
import image2 from "../../assets/Rectangle 24.png";
import image3 from "../../assets/Rectangle 25.png";
import image4 from "../../assets/Rectangle 26.png";
import image5 from "../../assets/Rectangle 27.png";
import image6 from "../../assets/Rectangle 28.png";
import image7 from "../../assets/Rectangle 29.png";

export default function Modal({ setShowModal }) {
  return ( 
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none overflow-y-hidden">
        <div className="relative w-[700px] my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold text-gray-400">
                Share your idea
              </h3>
              <div>
                <button className="p-2 px-4 bg-black text-white rounded-md mr-8">
                  Publish
                </button>
              </div>
            </div>
            {/*body*/}
            <div className=" flex p-6 flex-auto">
              <div className="ml-4  grid  p-4">
                <img src={border} className="w-56 h-56 absolute z-10" />
                <div className="m-auto ml-12">
                  <img src={image} className="w-14 h-14 absolute z-0 ml-6" />
                  <button className="rounded-xl border-2 border-violet-500 text-violet-500 px-2 mt-20 ml-6">
                    browse
                  </button>
                </div>
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
                type="text"
                className="w-[500px] py-2 m-auto bg-gray-200 outline-none mt-10 placeholder:px-4"
                placeholder="title"
              />
              <textarea
                class="resize-none border  border-black rounded-md w-[500px] mt-4 mb-10 outline-none"
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
