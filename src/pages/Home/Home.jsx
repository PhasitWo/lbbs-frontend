import React from 'react'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Home