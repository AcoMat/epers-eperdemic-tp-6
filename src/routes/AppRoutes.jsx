import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MapPage from '../pages/MapPage'
import FriendPage from '../pages/FriendPage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MapPage />} />
        <Route path='/friends' element={<FriendPage />} />
    </Routes>
  )
}

export default AppRoutes