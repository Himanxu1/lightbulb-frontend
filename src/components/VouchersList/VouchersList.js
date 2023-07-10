import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import image from "../../assets/user (1).png";

const base_url = process.env.REACT_APP_BACKEND_URL;

const VouchersList = ({ showVouchers, setShowVouchers, ideaId }) => {
  const [vouchersData, setVouchersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log(vouchersData);
  }, [vouchersData]);

  useEffect(() => {
    Axios.get(`${base_url}/api/ideas/vouchersList?ideaID=${ideaId}`)
      .then((res) => {
        console.log(res.data.data);
        setVouchersData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className='relative z-10'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
      <div className='relative sm:min-w-[600px] w-10/12 sm:w-3/4 md:w-3/5 my-6 mx-auto'>
        <div className='rounded-lg shadow-md flex flex-col w-full bg-white'>
          <div className=' h-fit max-h-96 overflow-y-auto'>
            <div className='sticky top-0 bg-white pt-4 px-4'>
              <h2 className='sm:text-[20px] text-[18px] font-medium mb-2'>
                Voucher Details
              </h2>
              <hr className='mb-2' />
            </div>

            {isLoading ? (
              <p className='text-gray-500 font-normal m-5'>Loading...</p>
            ) : vouchersData.length === 0 ? (
              <p className='text-gray-500 font-normal m-5'>
                No one has vouched yet!
              </p>
            ) : (
              vouchersData.map((voucher, ind) => (
                <div
                  key={ind}
                  className='flex items-center font-medium sm:py-2 py-2'
                >
                  <Link to={`/profile/${voucher[0]?.userId}`}>
                    <div className='w-14 min-w-fit ml-3 '>
                      <img
                        src={
                          voucher[0]?.photoUrl ? voucher[0]?.photoUrl : image
                        }
                        // alt={voucher[0].name}
                        className='w-10 h-10 rounded-full'
                      />
                    </div>
                  </Link>
                  <div className='sm:flex w-full sm:ml-0 ml-5'>
                    <p className='w-[160px] sm:ml-5 truncate'>
                      {voucher[0]?.name ? voucher[0]?.name : "user name"}
                    </p>
                    <p className='w-3/5 truncate'>
                      {voucher[0]?.email ? voucher[0]?.email : "user email"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className='flex items-center justify-end border-t border-solid border-slate-200 rounded-b'>
            <button
              className='text-red-500 text-sm sm:text-base background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              type='button'
              onClick={() => setShowVouchers(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VouchersList;
