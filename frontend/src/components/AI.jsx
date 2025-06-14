import React from 'react'
import { GrAttachment } from "react-icons/gr";
const AI = () => {
  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
        <div className="overflow-y-auto h-[90%] p-4 bg-gray-50 rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">AI Chat</h1>
          <div className="flex flex-col space-y-96">
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-700">Hello! How can I assist you today?</p>
            </div>
            <div className="bg-blue-200 p-4 rounded-lg self-end">
              <p className="text-gray-700">I need help with my resume.</p>
            </div>
          </div>
        </div>
          <div className="flex items-center justify-center gap-4">
            <div className="ml-2 mr-2"><GrAttachment className="text-xl cursor-pointer"/></div>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
            <div>
            <button className="p-2 bg-violet-400 hover:bg-violet-500 rounded-xl">Send</button>
            </div>
            
          </div>
      </div>
    </div>
  )
}

export default AI
