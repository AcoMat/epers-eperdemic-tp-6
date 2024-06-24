import { ComputerRounded, MapRounded, PeopleRounded } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Card } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const BottomBar = () => {

  const { pathname } = useLocation()
  
  return (
    <Card style={containerStyle}>
      <BottomNavigation showLabels value={pathname}> 
          <BottomNavigationAction LinkComponent={Link} to={"/"} label="Home" value={"/"} icon={<MapRounded />} />
          <BottomNavigationAction LinkComponent={Link} to={"/friends"} label="Friends" value={"/friends"} icon={<PeopleRounded />} />
          <BottomNavigationAction LinkComponent={Link} to={"/groups"} label="Groups" value={"/groups"} icon={<ComputerRounded />} />
      </BottomNavigation>
    </Card>
  )
}

const containerStyle = {
  position: "absolute",
  bottom: "16px",
  borderRadius: 16,
  maxWidth: "40%",
  margin: "0 auto",
  left: 0,
  right: 0,
} 

export default BottomBar