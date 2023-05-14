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

 const {loading,vouchedData} = useContext(VouchContext); 
 const newVouchData = vouchedData.reverse()

  return (
    <div className="mx-60 grid grid-cols-2 mt-20 gap-x-14 gap-y-10 pb-20">
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {newVouchData.map((item) => {
            return (
              <>
                <ProfileIdeaCard
                  title={item?.title}
                  description={item?.description}
                  imageUrl={image1}
                  key={item?.userID}
                  ideaID={item?.ideaID}
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
