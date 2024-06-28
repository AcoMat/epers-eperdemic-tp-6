import React from 'react'
import { Background } from '../Background/Background'
import { CircularProgress } from '@mui/material'

const Loading = React.forwardRef(({style, className}, ref) => {
    return (
      <div className={className} style={{...containerFullWidthStyle, ...style}} ref={ref}>
        <Background style={backgroundStyle}>
            <CircularProgress color='primary' />
        </Background>
      </div>
    )
})

const containerFullWidthStyle = {
  width: "100%",
  height: "100%",
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