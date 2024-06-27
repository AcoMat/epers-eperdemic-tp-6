import React, { useContext } from 'react'
import './AppTemplate.css'
import BottomBar from '../components/BottomBar/BottomBar'
import UserBar from '../components/UserBar/UserBar';
import { AuthContext } from '../auth/AuthContextProvider';
import Login from '../components/Login/Login';
import { Fade, Slide } from '@mui/material';
import Loading from '../components/Loading/Loading';

const AppTemplate = ({children}) => {
  const { isLoading, user, signIn } = useContext(AuthContext)

  if(isLoading) {
    return (
      <Loading />
    )
  }

  if(!user) {
    return (
      <Slide direction='up' in={user !== null}>
        <Login signIn={signIn} />
      </Slide>
    )
  }

  return (
      <div className='app-template'>
          <div className='app-template-body'>
            <UserBar />
            <main className='app-template-main-content'>
              {children}
            </main>
            <BottomBar />
          </div>
      </div>
  )
}

export default AppTemplate