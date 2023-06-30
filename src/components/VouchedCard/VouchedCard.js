import React, { useContext, useState, useEffect } from "react";
import ProfileIdeaCard from "../ProfileIdeaCard/ProfileIdeaCard";
import image1 from "../../assets/Group 16.png";
import image2 from "../../assets/Cactus 2 by Streamlinehq.png";
import image3 from "../../assets/Group 6.png";
import image4 from "../../assets/Ram by Streamlinehq.png";
import { AuthContext } from "../../Context/AuthContext";
import Axios from "axios";
import { VouchContext } from "../../Context/VouchContext";

const base_url = process.env.REACT_APP_BACKEND_URL;

const VouchedCard = ({ stranger, id }) => {
  const { loading, vouchedData } = useContext(VouchContext);

  const [myVouchedData, setMyVouchedData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (stranger) {
      Axios.get(`${base_url}/api/vouches/vouched-ideas?userID=${id}`).then(
        (res) => {
          setMyVouchedData(res.data.data.reverse());
          setLoad(false);
        }
      );
    } else {
      const newVouchData = vouchedData.reverse();
      setMyVouchedData(newVouchData);
      setLoad(false);
    }
  }, [stranger]);

  return load ? (
    <h1>Loading</h1>
  ) : (
    <div>
      {myVouchedData.length === 0 ? (
        <h1 className='text-center mt-10 pb-10'>
          Haven't vouched any idea yet
        </h1>
      ) : (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center mt-10 gap-5'>
          {myVouchedData.map((item) => {
            return (
              <div key={item.userID} className='w-full'>
                <ProfileIdeaCard
                  key={item.userID}
                  userID={item.userID}
                  title={item.title}
                  description={item.description}
                  imageUrl={image1}
                  userPhotoUrl={item.userPhotoUrl}
                  ideaID={item.ideaID}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VouchedCard;
