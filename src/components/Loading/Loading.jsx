import React from 'react'
import { Background } from '../Background/Background'
import { CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <Background style={backgroundStyle}>
        <CircularProgress color='primary' />
    </Background>
  )
}

const backgroundStyle = {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%"
}

export default Loading