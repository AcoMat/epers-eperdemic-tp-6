import { AccountCircle, AccountCircleRounded, SearchOutlined } from '@mui/icons-material'
import { Card, Divider, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import UserSearched from '../UserSearched/UserSearched'

const SearchUser = ({search, onChange, style, users, friendsIds, onAddFriend, userId}) => {
  return (
    <Card style={{...searchContainerStyle, ...style}}>
        <OutlinedInput 
          id='search-user-input'
          color='primary'
          onChange={onChange}
          value={search}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton>
                <SearchOutlined color='primary' />
              </IconButton>
            </InputAdornment>
          }
        />
        <Divider variant='middle' />
        {users.map(user => <UserSearched userUid={userId} onFriendAddPress={onAddFriend} friendsIds={friendsIds} user={user} />)}
    </Card>
  )
}

const searchContainerStyle = {
  display: "flex",
  flexDirection: "column",
  maxHeight: "70%",
  padding: 16,
  width: "auto",
  gap: 16,
  overflowY: "scroll"
}

export default SearchUser