import React, { useContext } from "react";
import "./Friend.css";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { PersonRemoveOutlined } from "@mui/icons-material";
import ColorModeContext from "../../theme/ColorModeContext";

const Friend = ({ user, onRemove }) => {
  const { mode } = useContext(ColorModeContext);

  return (
    <ListItem
      style={{ ...cardStyle }}
      secondaryAction={
        <IconButton onClick={() => onRemove(user)}>
          <PersonRemoveOutlined
            color={mode === "dark" ? "secondary" : "primary"}
          />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar style={avatarImageStyle} src={user.photoUrl} />
      </ListItemAvatar>
      <ListItemText primary={user.displayName} />
    </ListItem>
  );
};

const avatarImageStyle = {
  height: 56,
  width: 56,
};

const cardStyle = {
  padding: 16,
  display: "flex",
  flexDirection: "row",
  gap: 16,
};

export default Friend;
