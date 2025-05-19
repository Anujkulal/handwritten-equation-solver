import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../screens/LandingPage'
import SecondDegree from '../screens/SecondDegree'
import ThirdDegree from '../screens/ThirdDegree'

const Layout = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/second' element={<SecondDegree />} />
            <Route path='/third' element={<ThirdDegree />} />
        </Routes>
    </div>
  )
}

export default Layout