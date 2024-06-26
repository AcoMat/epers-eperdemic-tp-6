import { PersonAddOutlined } from '@mui/icons-material'
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

const UserSearched = ({user, friendsIds, onFriendAddPress, userUid}) => {
  const isFriend = friendsIds.some(friendId => friendId === user.uid)
  const isUser = user.uid === userUid
  const shouldShowAddButton = !isUser && !isFriend

  return (
    <ListItem
        secondaryAction={
            !shouldShowAddButton
            ? null
            : <IconButton onClick={() => onFriendAddPress(user)}>
                <PersonAddOutlined
                />
              </IconButton>
        }
        >
        <ListItemAvatar>
            <Avatar src={user.photoUrl} />
        </ListItemAvatar>
        <ListItemText primary={user.displayName} />
    </ListItem>
  )
}

export default UserSearched