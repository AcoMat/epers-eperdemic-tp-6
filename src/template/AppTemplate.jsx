import React from 'react'
import './AppTemplate.css'
import BottomBar from '../components/BottomBar/BottomBar'

window.getComputedStyle(document.documentElement).getPropertyValue('--color-font-general');

const AppTemplate = ({children}) => {
  return (
        <div className='app-template'>
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