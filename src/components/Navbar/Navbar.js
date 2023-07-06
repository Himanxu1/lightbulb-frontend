import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import avatar from "../../assets/user (1).png";
import hamburger from "../../assets/hamburger.png";
import close from "../../assets/close.png";
import "../../CSS/navbar.css";
import { AuthContext } from "../../Context/AuthContext";
import { IdeasContext } from "../../Context/IdeasContext";

const Navbar = () => {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const { ideas, setIdeas } = useContext(IdeasContext);

  const [showSeach, setShowSearch] = useState(false);
  const [searchInput, setSeachInput] = useState("");
  const [searchedIdeas, setSearchedIdeas] = useState([]);

  // const nav = document.getElementsByClassName("nav");
  const _navlinks = document.getElementsByClassName("_navlinks");
  const _search = document.getElementsByClassName("_search");

  const hideMenu = () => {
    _navlinks[0].style.right = "-200px";
  };

  const showMenu = () => {
    _navlinks[0].style.right = "0px";
  };
  const toggleSearch = () => {
    // _search[0].style.width = "200px";
    const currentWidth = _search[0].style.width;
    _search[0].style.width = currentWidth === "150px" ? "0px" : "150px";
    if (_search[0].style.width == "0px") {
      setSeachInput("");
    }
  };
  const searchIdeas = () => {};

  useEffect(() => {
    if (searchInput.length == 0) {
      setSearchedIdeas([]);
    } else {
      const result = ideas.filter((item) => {
        return item.title.includes(searchInput);
      });
      setSearchedIdeas(result);
    }
  }, [searchInput]);

  //------ searchedIdeas component
  const SearchedIdeas = ({ searchedIdeas }) => {
    return (
      <div className='pb-2'>
        <ul>
          {searchedIdeas.map((idea) => (
            <li key={idea.ideaID}>
              <div className='flex space-x-3 items-center my-1 cursor-pointer'>
                <img
                  src={idea ? idea.userPhotoUrl : ""}
                  className='w-8 h-8 shadow-md hover:border-[.1px] hover:shadow rounded-full'
                />
                <Link
                  to={`/ideas/${idea.ideaID}`}
                  onClick={() => setSeachInput("")}
                >
                  <div className='title line-clamp-1 hover:underline'>
                    {idea.title}
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // ------- if no user ---------
  if (location.pathname === "/login") {
    return <></>;
  }

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
            onClick={() => {
              toggleSearch();
              searchIdeas();
            }}
          />
          <div className='flex flex-col'>
            <input
              value={searchInput}
              type='text'
              placeholder='search ideas'
              onInput={(e) => setSeachInput(e.target.value)}
              className='_search w-full sm:h-12 h-10 sm:pl-12 pl-[46px] sm:text-base text-sm sm:font-normal font-medium text-gray-500 border rounded-3xl outline-none bg-gray-50 focus:bg-white focus:border-indigo-600'
            />
            <div className='absolute top-14 bg-white px-4 w-full rounded-lg'>
              {/* Display SearchedIdeas component when there are searched ideas */}
              {searchedIdeas.length > 0 ? (
                <SearchedIdeas searchedIdeas={searchedIdeas} />
              ) : searchInput.length > 0 ? (
                <div className='text-gray-500'>No ideas found.</div>
              ) : null}
            </div>
          </div>
          {!currentUser ? (
            <Link to={`/login`}>
              <div className='w-12 h-12 ml-2 sm:mr-4 p-1'>
                <img
                  className='rounded-full'
                  src={currentUser ? currentUser?.photoURL : avatar}
                />
              </div>
            </Link>
          ) : (
            <Link to={`/profile/${currentUser?.uid}`}>
              <div className='w-12 h-12 ml-2 sm:mr-4 p-1'>
                <img
                  className='rounded-full'
                  src={currentUser ? currentUser?.photoURL : avatar}
                />
              </div>
            </Link>
          )}

          <div className='_icon2 _hamburger w-7 my-auto mx-1'>
            <img src={hamburger} alt='' onClick={() => showMenu()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
