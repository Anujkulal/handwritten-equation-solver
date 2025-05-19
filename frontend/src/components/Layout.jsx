import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../screens/LandingPage'
import SecondDegree from '../screens/SecondDegree'
import ThirdDegree from '../screens/ThirdDegree'
import { SignIn, SignUp } from '../screens/AuthPage'

const Layout = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/second' element={<SecondDegree />} />
            <Route path='/third' element={<ThirdDegree />} />
        </Routes>
    </div>
  )
}

export default Layout