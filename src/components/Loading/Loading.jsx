import React from 'react'
import { Background } from '../Background/Background'
import { CircularProgress } from '@mui/material'

const Loading = ({style}) => {
  return (
    <Background style={{...backgroundStyle, ...style}}>
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