import React from 'react'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className="bg-slate-50">
      <Outlet/>
    </div>
  )
}

export default App
