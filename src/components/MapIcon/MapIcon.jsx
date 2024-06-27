import React from 'react'
import { ReactComponent as Logo } from '../../assets/map-icon.svg'
import { useTheme } from '@emotion/react'

const MapIcon = ({className = ''}) => {
  const theme = useTheme()

  return (
    <Logo className={className} stroke={theme.palette.background.onBackground}/>
  )
}

export default MapIcon