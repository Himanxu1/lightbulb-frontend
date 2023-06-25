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
  const _navlinks = document.getElementsByClassName("_navlinks");

  const hideMenu = () => {
    // if (_navlinks.length > 0) {
    _navlinks[0].style.right = "-400px";
    // }
  };

  const showMenu = () => {
    // if (_navlinks.length > 0) {
    _navlinks[0].style.right = "-100px";
    // }
  };

  return (
    <div className=' p-3 shadow-sm shadow-gray '>
      <div className='flex items-center justify-between lg:mx-16 md:mx-4'>
        <div className='flex lg:space-x-14 space-x-2 md:mr-9 mr-4 '>
          <Link to='/landingpage'>
            <h3 className='font-bold md:text-2xl text-xl'>Litebulb</h3>
          </Link>
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
        <div className='relative flex'>
          <BiSearch className='absolute top-0 bottom-0 w-6 h-6 my-auto left-3' />
          <input
            type='text'
            placeholder='search ideas'
            className='md:w-3/5 w-44 pl-12 text-gray-500 border rounded-3xl outline-none bg-gray-50 focus:bg-white focus:border-indigo-600'
          />
          <Link to='/profile'>
            <div className='w-12 h-12 ml-2 sm:mr-4'>
              <img src={currentUser ? currentUser?.photoURL : avatar} />
            </div>
          </Link>
          <div className='_icon2 _hamburger w-7 my-auto mx-2'>
            <img src={hamburger} alt='' onClick={() => showMenu()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
