import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MapPage from '../pages/MapPage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MapPage />} />
        <Route path='/friends' element={<div>friends</div>} />
    </Routes>
  )
}

export default AppRoutes