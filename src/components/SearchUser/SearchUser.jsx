import { AccountCircle, AccountCircleRounded, SearchOutlined } from '@mui/icons-material'
import { Card, Divider, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import UserSearched from '../UserSearched/UserSearched'
import SimpleInput from '../SimpleInput/SimpleInput'
import ColorModeContext from '../../theme/ColorModeContext'

const SearchUser = ({search, onChange, style, users, friendsIds, onAddFriend, userId, onSearchPress}) => {
  
  const {mode} = useContext(ColorModeContext)

  return (
    <Card style={{...searchContainerStyle, ...style}}>
      <SimpleInput placeholder="Buscar usuarios" onChange={onChange} value={search} onSearchPress={onSearchPress}>
        <IconButton onClick={onSearchPress}>
          <SearchOutlined color={mode === "dark" ?  "primary" :  "secondary"} />
        </IconButton>
      </SimpleInput>
      <ul style={scrollStyle}>
        {users.map(user => <UserSearched key={user.uid} userUid={userId} onFriendAddPress={onAddFriend} friendsIds={friendsIds} user={user} />)}
      </ul>
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
  overflowY: "hidden"
}

const scrollStyle = {
  overflowY: "scroll"
}

export default SearchUser