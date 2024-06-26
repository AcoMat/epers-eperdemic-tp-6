import React from 'react'
import Friend from '../Friend/Friend'
import { List } from '@mui/material'
import './FriendList.css'

const FriendsList = ({friends, onRemoveFriend, style, onFriendClick}) => {
  return (
    <List className='friend-list-container' style={{...style}}>
      {friends.map(friend => <Friend key={friend.uid} onFriendClick={onFriendClick} style={{width: "50%"}} user={friend} onRemove={onRemoveFriend} />)}
    </List>
  ) 
}

export default FriendsList