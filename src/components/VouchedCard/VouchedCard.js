import React from 'react'
import ProfileIdeaCard from '../ProfileIdeaCard/ProfileIdeaCard'
import image1 from "../../assets/Group 16.png";
import image2 from "../../assets/Cactus 2 by Streamlinehq.png";
import image3 from "../../assets/Group 6.png";
import image4 from "../../assets/Ram by Streamlinehq.png";

const VouchedCard = () => {
  return (
    <div className="mx-60 grid grid-cols-2 mt-20 gap-x-14 gap-y-10">
    <ProfileIdeaCard
      title="A plarform for token gated scheduled booking."
      description="Admittedly, it is a surrogate experience, but so are love stories and travel novels. It is artificial, but not vulgar. And more importantly, it substantially changes Read more   artificial, but not vulgar. And more importantly, it substantially changes ... Read more "
      imageUrl={image1}
    />
    <ProfileIdeaCard
      title="A plarform for token gated scheduled booking."
      description="Admittedly, it is a surrogate experience, but so are love stories and travel novels. It is artificial, but not vulgar. And more importantly, it substantially changes Read more   artificial, but not vulgar. And more importantly, it substantially changes ... Read more "
      imageUrl={image2}
    />
    <ProfileIdeaCard
      title="A plarform for token gated scheduled booking."
      description="Admittedly, it is a surrogate experience, but so are love stories and travel novels. It is artificial, but not vulgar. And more importantly, it substantially changes Read more   artificial, but not vulgar. And more importantly, it substantially changes ... Read more "
      imageUrl={image3}
    />
    <ProfileIdeaCard
      title="A plarform for token gated scheduled booking."
      description="Admittedly, it is a surrogate experience, but so are love stories and travel novels. It is artificial, but not vulgar. And more importantly, it substantially changes Read more   artificial, but not vulgar. And more importantly, it substantially changes ... Read more "
      imageUrl={image4}
    />
  </div>
  )
}

export default VouchedCard