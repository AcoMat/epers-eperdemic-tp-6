import React from 'react'
import Header from '../components/Header/Header'
import './AppTemplate.css'
import { BottomNavigation, BottomNavigationAction, StyledEngineProvider } from '@mui/material'
import { Map } from '@mui/icons-material'
import colors from '../utils/colors'
import BottomBar from '../components/BottomBar/BottomBar'

window.getComputedStyle(document.documentElement).getPropertyValue('--color-font-general');

const AppTemplate = ({children}) => {
  return (
        <div className='app-template'>
          <Header />
          <div className='app-template-body'>
            <main className='app-template-main-content'>
              {children}
            </main>
            <BottomBar />
          </div>
      </div>
  )
}

export default AppTemplate