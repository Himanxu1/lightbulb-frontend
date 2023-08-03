import React, { useRef } from "react";
import { FaRegCopy, FaTimes } from "react-icons/fa";
import whatsappIcon from "../../assets/whatsapp.png";
import mailIcon from "../../assets/gmail.png";
import telegramIcon from "../../assets/telegram.png";
import twitterIcon from "../../assets/twitter.png";

const LinkModal = ({ ideaID, visible, setVisible, handleClose, notify }) => {
  const copiedLink = useRef("");

  const handleCopy = () => {
    //--------- copying url -----------
    navigator.clipboard.writeText(copiedLink.current.href);
    notify("Linked Copied to Clipboard");
    setVisible(false);
  };

  function openWhatsAppShare() {
    const text = `Hello, check out this amazing idea! Link: https://www.litebulb.xyz/ideas/${ideaID}`;
    const url = `https://wa.me?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  function openEmailShare() {
    const subject = "Check out this amazing idea";
    const body = `Here is the Link https://www.litebulb.xyz/ideas/${ideaID}`;

    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  function openTelegramShare() {
    const url = ` https://www.litebulb.xyz/ideas/${ideaID}`;
    const text = "Check out this amazing idea";

    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  const openTwitterShare = () => {
    const baseUrl = "https://www.litebulb.xyz";
    const fullLink = `${baseUrl}/ideas/${ideaID}`;

    const encodedLink = encodeURIComponent(fullLink);

    const tweetUrl = `https://twitter.com/intent/tweet?url=${encodedLink}&text=Check%20out%20this%20awesome%20idea!`;

    window.open(tweetUrl, "_blank");
  };

  if (!visible) return null;

  return (
    <div
      id="dismiss"
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white relative rounded-md w-72 md:w-96">
        {/*----------- closing modal button ------------*/}
        <FaTimes
          id="dismiss-x"
          className=" absolute right-3 p-1 text-gray-500 hover:text-red-500  top-3"
          onClick={(e) => handleClose(e)}
          size={"1.5rem"}
        />
        <div className="p-6 flex items-center justify-center space-x-3">
          <div className=" border-dashed border w-64 break-words border-gray-400 rounded-md px-3 py-1 text-sm ">
            <p className="myFont text-gray-500 font-medium ">
              Link:
              <a
                ref={copiedLink}
                href={`https://www.litebulb.xyz/ideas/${ideaID}`}
                className="myFont ml-1 text-blue-500"
              >
                {`https://www.litebulb.xyz/ideas/${ideaID}`}
              </a>
            </p>
          </div>
          <div className=""></div>
          {/*------------ button to copy url ------------*/}
          <FaRegCopy
            onClick={handleCopy}
            className="text-gray-500 text-lg hover:text-blue-500 hover:-translate-y-px transition-all ease-in-out"
          />
        </div>
        <div className="mx-10 mb-8">
          <p className="mb-3 font-medium ">Share via</p>
          <div className="mx-3 flex items-center mx-autoś space-x-8 font-medium text-xs">
            <div
              className="w-10 flex flex-col items-center"
              onClick={() => openWhatsAppShare()}
            >
              <img
                src={whatsappIcon}
                className="rounded-full hover:-translate-y-px transition-all ease-in-out"
              />
              <p>Whatsapp</p>
            </div>
            <div
              className="w-10 flex flex-col items-center "
              onClick={() => openEmailShare()}
            >
              <img
                src={mailIcon}
                className="hover:-translate-y-px transition-all ease-in-out"
              />
              <p>Mail</p>
            </div>
            <div
              className="w-10 flex flex-col items-center"
              onClick={() => openTelegramShare()}
            >
              <img
                src={telegramIcon}
                className="rounded-full hover:-translate-y-px transition-all ease-in-out"
              />
              <p>Telegram</p>
            </div>
            <div
              className="w-10 flex flex-col items-center"
              onClick={() => openTwitterShare()}
            >
              <img
                src={twitterIcon}
                className="hover:-translate-y-px transition-all ease-in-out"
              />
              <p>Twitter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
