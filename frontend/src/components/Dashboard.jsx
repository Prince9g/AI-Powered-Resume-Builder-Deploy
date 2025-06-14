import React from 'react'
import Navbar from './Navbar'
import Templates from './Templates'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Dashboard
