import React, { useEffect, useState } from "react";
import Axios from "axios";

const base_url = process.env.REACT_APP_BACKEND_URL;

const VouchersList = ({ showVouchers, setShowVouchers, ideaId }) => {
  const [vouchersData, setVouchersData] = useState([]);

  useEffect(() => {
    // console.log(vouchersData);
  }, [vouchersData]);

  useEffect(() => {
    Axios.get(`${base_url}/api/ideas/vouchersList?ideaID=${ideaId}`)
      .then((res) => {
        setVouchersData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='relative z-10'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
      <div className='relative w-10/12 sm:w-3/4 md:w-3/5 my-6 mx-auto'>
        <div className='rounded-lg shadow-md flex flex-col w-full bg-white'>
          <div className='p-4'>
            <h2 className='sm:text-[20px] text-[18px] font-medium mb-2'>
              Voucher Details
            </h2>
            <hr className='mb-2' />

            {vouchersData.length == 0 ? (
              <p className='text-gray-500 font-normal m-5'>
                No one has vouched yet !
              </p>
            ) : (
              vouchersData.map((voucher, ind) => (
                <div
                  key={ind}
                  className=' flex items-center font-medium sm:py-2 py-2'
                >
                  <div className='w-14 min-w-fit ml-3 '>
                    <img
                      src={voucher[0].photoUrl}
                      alt={voucher[0].name}
                      className='w-10 h-10 rounded-full'
                    />
                  </div>
                  <div className='sm:flex w-full sm:ml-0 ml-5'>
                    <p className='w-[160px] sm:ml-5 truncate'>
                      {voucher[0].name}
                    </p>
                    <p className=''>{voucher[0].email}</p>
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
