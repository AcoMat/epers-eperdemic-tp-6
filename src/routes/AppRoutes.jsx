import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MapPage from '../pages/MapPage'
import FriendPage from '../pages/FriendPage'
import GroupPage from '../pages/GroupPage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MapPage />} />
        <Route path='/friends' element={<FriendPage />} />
        <Route path='/groups' element={<GroupPage />} />
        <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default AppRoutes