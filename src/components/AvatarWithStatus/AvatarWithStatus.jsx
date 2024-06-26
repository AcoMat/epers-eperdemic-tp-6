import { Avatar, Badge, Tooltip } from '@mui/material'
import React from 'react'
import UserStatus from '../UserStatus/UserStatus'

const AvatarWithStatus = ({avatarStyle, user, onClick, selectable = true}) => {
  const estado = () => {
    if(user.estaInfectado === null) return "Cargando..."
    if(user.estaInfectado) return "Infectado"
    return "Sano"
  }
  return (
    <Tooltip title={estado()}>
      <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={<UserStatus user={user} />}
          >
            <Avatar sx={{cursor: selectable ? 'pointer' : 'unset'}} onClick={onClick} style={{...avatarStyle}} src={user.photoUrl} />
      </Badge>
    </Tooltip>
  )
}

export default AvatarWithStatus