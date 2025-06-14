import React, { useState } from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
const Navbar = () => {
    const [toggle, setToggle] = useState('resume');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogoutHandler = ()=>{
      dispatch(logoutUser());
      setTimeout(()=>{
        navigate('/');
      }, 1000);
    }
  return (
    <div className="flex justify-between items-center p-4 bg-sky-100">
        {/* logo  */}
      <div className="text-xl">ResumeConnect</div>
      {/* navigation links */}
      {/* bg-sky-600 text-white rounded-full px-2 py-1.5  */}
      <div className="relative ml-10">
        <div 
            className={`absolute top-1/2 left-1 h-9 w-[120px] bg-sky-600 rounded-full transition-all duration-300 ease-in-out transform -translate-y-1/2 ${toggle === 'ai' ? "translate-x-full" : "translate-x-0"}`}
        ></div>
        <div className="flex items-center justify-center border border-black rounded-full gap-2">
            <Link to="t1" className={`cursor-pointer relative p-2 z-10 border-black ${toggle === 'resume' ? "text-white" : "text-black"}`} onClick={() => setToggle('resume')}>Resume Builder</Link>
            <Link to="ai" className={`cursor-pointer relative p-2 pr-3 z-10 ${toggle === 'ai' ? "text-white": "text-black"}`} onClick={() => setToggle('ai')}>AI Assistance</Link>
        </div>
      </div>
      {/* dropdown menu */}
      <div className="">
        <div className="flex justify-center items-center text-lg gap-8">
            <div className="relative group">
            <a href="#" className="border rounded-xl px-3 py-1 bg-sky-50">Menu</a>
            <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white text-indigo-600 rounded-md shadow-lg hidden group-hover:block transition duration-300">
              <Link to="/dashboard/my-resumes" className="block px-4 py-2 hover:bg-gray-100">My Resumes</Link>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">History</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Help</a>
            </div>
            </div>
            
            <a href="#"><IoMdNotificationsOutline className="text-3xl"/></a>
            <div>
                <div className="relative group cursor-pointer">
                    <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" alt="user" className="rounded-full w-12 h-12"/>
                    <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white text-indigo-600 rounded-md shadow-lg hidden group-hover:block transition duration-300">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                            <div className="flex justify-between items-center" onClick={onLogoutHandler}>
                                <span>Logout</span>
                                <FaArrowRightFromBracket className="text-red-600"/>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
