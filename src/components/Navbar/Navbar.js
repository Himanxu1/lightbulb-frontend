import React from 'react'
import { Link } from 'react-router-dom'
import {BiSearch} from 'react-icons/bi';

const Navbar = () => {
  return (
    <div className='h-20 shadow-sm shadow-gray '>
        <div className='flex justify-between pt-4 px-14 items-center'>
        <h3 className='font-bold text-2xl'>Lightbulb</h3>
        <ul className='flex space-x-14 mr-72 text-xl'>
           <Link>
            <li>Community</li>
           </Link> 
           <Link>
            <li>explore</li>
           </Link>
           <Link>
            <li>help</li>
           </Link>
        </ul>
        <div className="relative">
              <BiSearch  className="absolute top-0 bottom-0 w-6 h-6 my-auto left-3" />
                <input
                    type="text"
                    placeholder="search startup idea"
                    className="w-full py-1 pl-12 pr-4 text-gray-500 border rounded-3xl outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                />
            </div>
        </div>
    </div>
  )
}

export default Navbar