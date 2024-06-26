import { Typography } from '@mui/material'
import React from 'react'

const TextSection = ({icon, text, title}) => {
  return (
    <section style={textSectionStyle}>
        <div style={{alignSelf: "flex-start"}}>
            {icon}
        </div>
        <div>
            <Typography color={"background.onBackground"} variant='body1'>{title}</Typography>
            <Typography color={"background.onBackground"} variant='body2'>{text}</Typography>
        </div>
    </section>
  )
}

const textSectionStyle = {
    display: "flex",
    width: "100%",
    gap: 8,
    alignItems: "center"
}

export default TextSection