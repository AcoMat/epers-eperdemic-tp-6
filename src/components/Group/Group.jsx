import React from "react";
import "./Group.css";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { GroupAddOutlined } from "@mui/icons-material";

const Group = ({ group, onAddMemberToGroup }) => {

    return (
      <ListItem
        style={{ ...cardStyle }}
        secondaryAction={
          <IconButton onClick={() => onAddMemberToGroup(group.name)}>
            <GroupAddOutlined />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <p style={{ color: 'white' }}>{group.name}</p>
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