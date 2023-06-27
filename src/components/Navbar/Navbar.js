import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import avatar from "../../assets/user (1).png";
import hamburger from "../../assets/hamburger.png";
import close from "../../assets/close.png";
import "../../CSS/navbar.css";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  // const nav = document.getElementsByClassName("nav");
  const _navlinks = document.getElementsByClassName("_navlinks");
  const _search = document.getElementsByClassName("_search");

  const hideMenu = () => {
    // if (_navlinks.length > 0) {
    _navlinks[0].style.right = "-200px";
    // nav[0].style.display = "none";
    // }
  };

  const showMenu = () => {
    // if (_navlinks.length > 0) {
    _navlinks[0].style.right = "0px";
    // nav[0].style.display = "block";
    // }
  };
  const toggleSearch = () => {
    // _search[0].style.width = "200px";
    const currentWidth = _search[0].style.width;
    _search[0].style.width = currentWidth === "150px" ? "0px" : "150px";
  };

  return (
    <div className='sm:p-3 px-3 py-1 shadow-sm shadow-gray '>
      <div className='flex items-center justify-between lg:mx-16 md:mx-4'>
        <div className='flex lg:space-x-14 space-x-2 md:mr-9 sm:mr-4 mr-2 '>
          <Link to='/landingpage'>
            <h3 className='font-bold md:text-2xl text-xl'>Litebulb</h3>
          </Link>
          <div className='nav'>
            <ul className='_navlinks flex items-center lg:space-x-14 space-x-4 md:text-xl text-lg'>
              <i className='_icon1 fa fa-times' onClick={() => hideMenu()}></i>
              <Link to='/community'>
                <li>Community</li>
              </Link>
              <Link to='/explore'>
                <li>explore</li>
              </Link>
              <Link to='/help'>
                <li>help</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className='relative flex items-center'>
          <BiSearch
            className='absolute top-0 bottom-0 sm:w-6 w-5 sm:h-6 h-5 my-auto left-3'
            onClick={() => toggleSearch()}
          />
          <input
            type='text'
            placeholder='search ideas'
            className='_search w-full sm:h-12 h-10 sm:pl-12 pl-[46px] sm:text-base text-sm sm:font-normal font-medium text-gray-500 border rounded-3xl outline-none bg-gray-50 focus:bg-white focus:border-indigo-600'
          />
          <Link to='/profile'>
            <div className='w-12 h-12 ml-2 sm:mr-4'>
              <img src={currentUser ? currentUser?.photoURL : avatar} />
            </div>
          </Link>
          <div className='_icon2 _hamburger w-7 my-auto mx-1'>
            <img src={hamburger} alt='' onClick={() => showMenu()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
