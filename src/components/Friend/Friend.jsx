import React, { useContext } from "react";
import "./Friend.css";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { PersonRemoveOutlined } from "@mui/icons-material";
import AvatarWithStatus from "../AvatarWithStatus/AvatarWithStatus";

const Friend = ({ user, onRemove }) => {
  return (
    <ListItem
      style={{ ...cardStyle }}
      secondaryAction={
        <IconButton onClick={() => onRemove(user)}>
          <PersonRemoveOutlined />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <AvatarWithStatus user={user} avatarStyle={{height: 56, width: 56}} />
      </ListItemAvatar>
      <ListItemText primary={user.displayName} />
    </ListItem>
  );
};

const cardStyle = {
  padding: 16,
  display: "flex",
  flexDirection: "row",
  gap: 16,
};

export default Friend;