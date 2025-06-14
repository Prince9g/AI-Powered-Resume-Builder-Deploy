import React from 'react'
import hero from '../assets/hero.jpeg'
import { useNavigate } from 'react-router-dom'
const Homepage = () => {
  const navigate = useNavigate();
  const onSingUpClick = () => {
    navigate('/sign-up')
  }
  const onLoginClick = () => {
    navigate('/sign-in');
  }
  return (
    <div>
      <div className="relative">
        <img src={hero}/>
        <h1 className="absolute top-2 left-[40%] text-5xl">ResumeConnect</h1>
        <div className='absolute bottom-[15%] left-[45%]'>
        <div className="flex space-x-4 mt-4">
          <button className="bg-transparent text-violet-600 border border-violet-400 hover:bg-violet-500 hover:text-white transition-all duration-300 font-semibold font-mono py-2 px-5 rounded-full" onClick={onLoginClick}>Login</button>
          <button className="bg-transparent text-violet-600 border border-violet-400 hover:bg-violet-500 hover:text-white transition-all duration-300 font-semibold font-mono py-2 px-5 rounded-full" onClick={onSingUpClick}>Sign Up</button>
          </div> 
        </div>
        <div className='absolute bottom-[5%] left-[30%] font-serif text-amber-600'>
            <h1 className="text-4xl">Create a professional resume in minutes</h1>
            <p className="text-xl text-center">Get started with easy-to-use resume builder</p>
          </div> 
      </div>

    </div>
  )
}

export default Homepage
