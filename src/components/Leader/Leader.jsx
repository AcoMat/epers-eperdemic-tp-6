import React from 'react'
import Group from '../Group/Group'
import { Typography } from '@mui/material'

const Leader = ({group, position, onAddMemberToGroup}) => {
  return (
    <div style={leaderContainerStyle}>
        <Typography color={"background.onBackground"} variant='h5'>{`#${position}`}</Typography>
        <Group onAddMemberToGroup={onAddMemberToGroup} points={group.points} group={group} />
    </div>
  )
}

const leaderContainerStyle = {
    display: "flex",
    width: "100%",
    alignItems: "center",
}

export default Leader