import React from 'react'
import FriendsList from '../components/FriendsList/FriendsList'
import SearchUsers from '../components/SearchUsers/SearchUsers'
import './FriendPage.css'

const FriendPage = () => {
  return (
    <div className='friend-page-container'>
        <FriendsList friends={[]} />
        <SearchUsers />
    </div>
  )
}

export default FriendPage