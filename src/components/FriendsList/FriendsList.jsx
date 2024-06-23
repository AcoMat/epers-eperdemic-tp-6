import React from 'react'
import Friend from '../Friend/Friend'

const FriendsList = ({friends}) => {
  return (
    <div style={{backgroundColor: "red", height: "150%", overflowY: "scroll"}}>
      {friends.map((friend) => <Friend user={friend} />)}
    </div>
  ) 
}

export default FriendsList