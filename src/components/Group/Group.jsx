import React from "react";
import "./Group.css";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { GroupAddOutlined } from "@mui/icons-material";
import AvatarWithStatus from "../AvatarWithStatus/AvatarWithStatus";

const Group = ({ group, onAddMemberToGroup, user }) => {

    return (
      <ListItem
        style={{ ...cardStyle }}
        secondaryAction={
          <IconButton onClick={() => onAddMemberToGroup(user, group.name)}>
            <GroupAddOutlined />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <AvatarWithStatus user={group.lider} avatarStyle={{ height: 56, width: 56 }} />
        </ListItemAvatar>
        <ListItemText primary={group.lider.displayName} />
      </ListItem>
    );
  
}


const cardStyle = {
  padding: 16,
  display: "flex",
  flexDirection: "row",
  gap: 16,
};

export default Group;