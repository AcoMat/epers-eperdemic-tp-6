import React from 'react'
import Friend from '../Friend/Friend'
import { List } from '@mui/material'
import { useTheme } from '@emotion/react'

const FriendsList = ({friends, onRemoveFriend, style}) => {
  const theme = useTheme()

  return (
    <List style={{...friendListStyle, backgroundColor: theme.palette.background.default, ...style}}>
      {friends.map(friend => <Friend user={friend} onRemove={onRemoveFriend} />)}
    </List>
  ) 
}

const friendListStyle = {
  height: "100%",
  width: "auto",
  overflowY: "scroll"
}

export default FriendsList