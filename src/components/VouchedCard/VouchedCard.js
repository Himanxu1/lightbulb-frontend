import React, { useContext, useState, useEffect } from "react";
import ProfileIdeaCard from "../ProfileIdeaCard/ProfileIdeaCard";
import image1 from "../../assets/Group 16.png";
import image2 from "../../assets/Cactus 2 by Streamlinehq.png";
import image3 from "../../assets/Group 6.png";
import image4 from "../../assets/Ram by Streamlinehq.png";
import { AuthContext } from "../../Context/AuthContext";
import Axios from "axios";
import { VouchContext } from "../../Context/VouchContext";

const VouchedCard = () => {
  // console.log("VouchedCard")

  const { loading, vouchedData } = useContext(VouchContext);
  const newVouchData = vouchedData.reverse();
  // console.log(vouchedData)
  return vouchedData.length === 0 ? (
    <h1 className='text-center mt-10 pb-10'>
      You haven't vouched any idea yet
    </h1>
  ) : (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center mt-10 gap-5'>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {newVouchData.map((item) => {
            return (
              <>
                <ProfileIdeaCard
                  title={item.title}
                  description={item.description}
                  imageUrl={image1}
                  userPhotoUrl={item.userPhotoUrl}
                  key={item.userID}
                  ideaID={item.ideaID}
                />
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default VouchedCard;
