import { ComputerRounded, ExpandLessOutlined, ExpandMore, ExpandMoreOutlined, MapRounded, PeopleRounded } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Button, Card, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Background } from '../Background/Background'

const BottomBar = () => {

  const { pathname } = useLocation()
  const [hide, setHide] = useState(false)

  const toggleHide = () => {
    setHide(hide => !hide)
  }

  const cardStyle = { visibility: hide ? "hidden" : "visible" }

  return (
    <nav style={containerStyle}>
      <Card elevation={1} style={{...bottomBarStyle, ...cardStyle}}>
        <BottomNavigation showLabels value={pathname}> 
            <BottomNavigationAction LinkComponent={Link} to={"/"} label="Home" value={"/"} icon={<MapRounded />} />
            <BottomNavigationAction LinkComponent={Link} to={"/friends"} label="Friends" value={"/friends"} icon={<PeopleRounded />} />
            <BottomNavigationAction LinkComponent={Link} to={"/groups"} label="Groups" value={"/groups"} icon={<ComputerRounded />} />
        </BottomNavigation>
      </Card>
      <IconButton onClick={toggleHide}> 
        { hide ? <ExpandLessOutlined color='primary' /> : <ExpandMoreOutlined color='primary' /> }        
      </IconButton>
    </nav>
  )
}

const containerStyle = {
  position: "absolute",
  margin: "0 auto",
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "auto",
  justifyContent: "center",
  alignItems: "center",
} 

const bottomBarStyle = {
  borderRadius: 16,
  minWidth: "40%"
}

export default BottomBar