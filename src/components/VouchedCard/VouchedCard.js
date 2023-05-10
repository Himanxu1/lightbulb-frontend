import React, { useContext, useState, useEffect } from "react";
import ProfileIdeaCard from "../ProfileIdeaCard/ProfileIdeaCard";
import image1 from "../../assets/Group 16.png";
import image2 from "../../assets/Cactus 2 by Streamlinehq.png";
import image3 from "../../assets/Group 6.png";
import image4 from "../../assets/Ram by Streamlinehq.png";
import { AuthContext } from "../../Context/AuthContext";
import Axios from "axios";

const VouchedCard = () => {
  const [vouchedData, setVouchedData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `http://lightbulb-server-env.eba-je399ubq.ap-south-1.elasticbeanstalk.com/api/vouches/vouched-ideas?userID=${currentUser?.uid}`
    ).then((res) => {
      console.log(res.data.data);
      setVouchedData(res.data.data);
      setLoading(false);
    });
  }, [loading]);

  return (
    <div className="mx-60 grid grid-cols-2 mt-20 gap-x-14 gap-y-10 pb-20">
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {vouchedData.map((item) => {
            return (
              <>
                <ProfileIdeaCard
                  title={item?.title}
                  description={item?.description}
                  imageUrl={image1}
                  key={item?.userID}
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
