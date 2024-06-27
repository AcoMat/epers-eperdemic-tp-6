import React from 'react'
import { Background } from '../Background/Background'
import MapIcon from '../MapIcon/MapIcon'
import { Button, Typography } from '@mui/material'
import './Login.css'

const Login = React.forwardRef(({signIn}, ref) => {
  return (
    <div ref={ref} style={{width: "100%", height: "100%"}}>
      <Background className={'login-container'} ref={ref}>
          <div className='login-content-container'>
            <Typography align='center' variant='h3' color="background.onBackground">Para continuar, deberás iniciar sesión</Typography>
            <Button size='large' onClick={signIn} variant='outlined'>Iniciar sesion</Button>
          </div>
          <MapIcon className='map-icon'/>
      </Background>
    </div>
  )  
});

export default Login