import { AccountCircle, AccountCircleRounded, SearchOutlined } from '@mui/icons-material'
import { Card, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'

const SearchUser = ({search, onChange, style, users}) => {
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
    </Card>
  )
}

const searchContainerStyle = {
  display: "flex",
  flexDirection: "column",
  maxHeight: "70%",
  padding: 16,
  width: "auto"
}

export default SearchUser