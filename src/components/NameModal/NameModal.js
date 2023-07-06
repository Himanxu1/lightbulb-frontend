import React, { useState } from "react";
import Axios from "axios";

const base_url = process.env.REACT_APP_BACKEND_URL;

const NameModal = ({ setShowName, showName, setName, id }) => {
  const [updatedName, setUpdatedName] = useState("");
  const handleDelete = () => {
    setShowName(!showName);
  };

  const handleClick = () => {
    Axios.put(`${base_url}/api/auth/updatename?userId=${id}`, {
      name: updatedName,
    })
      .then((res) => {
        setName(res.data.data);
        setShowName(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className='relative z-10'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

      {/* <div className='absolute'> */}
      <div className='flex h-fit justify-center p-4 sm:p-0'>
        <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
          <div className='sm:flex sm:items-start bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
            <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
              <svg
                className='h-6 w-6 text-red-600'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                />
              </svg>
            </div>
            <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
              <h3
                className='text-base font-semibold leading-6 text-gray-900'
                id='modal-title'
              >
                Change Name
              </h3>
              <div className='mt-2'>
                <input
                  type='text'
                  className='h-10 w-56 px-4 py-2 h-fit bg-gray-100 '
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
            <button
              type='button'
              className='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto'
              onClick={handleClick}
            >
              update
            </button>
            <button
              type='button'
              className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
              onClick={handleDelete}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default NameModal;
