import { ComputerRounded, MapRounded, PeopleRounded } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const BottomBar = () => {

  const { pathname } = useLocation()
    
  return (
    <BottomNavigation showLabels value={pathname} onChange={(event, newValue) => console.log(newValue)}> 
        <BottomNavigationAction LinkComponent={Link} to={"/"} label="Home" value={"/"} icon={<MapRounded />} />
        <BottomNavigationAction LinkComponent={Link} to={"/friends"} label="Friends" value={"/friends"} icon={<PeopleRounded />} />
        <BottomNavigationAction LinkComponent={Link} to={"/groups"} label="Groups" value={"/groups"} icon={<ComputerRounded />} />
    </BottomNavigation>
  )
}

export default BottomBar