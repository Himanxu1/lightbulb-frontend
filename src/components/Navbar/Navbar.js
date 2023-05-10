import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import avatar from "../../assets/user (1).png";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="h-20 shadow-sm shadow-gray ">
      <div className="flex justify-between pt-4 px-14 items-center">
        <Link to="/">
          <h3 className="font-bold text-2xl">Lightbulb</h3>
        </Link>
        <ul className="flex space-x-14 mr-72 text-xl">
          <Link to="/community">
            <li>Community</li>
          </Link>
          <Link to="/explore">
            <li>explore</li>
          </Link>
          <Link to="/help">
            <li>help</li>
          </Link>
        </ul>
        <div className="relative flex">
          <BiSearch className="absolute top-0 bottom-0 w-6 h-6 my-auto left-3" />
          <input
            type="text"
            placeholder="search startup idea"
            className="w-full py-1 pl-12 pr-4 text-gray-500 border rounded-3xl outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          />
          <Link to="/profile">
            <img
              src={currentUser ? currentUser?.photoURL : avatar}
              className="w-12 h-12 rounded-3xl ml-10"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
