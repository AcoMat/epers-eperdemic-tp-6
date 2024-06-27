import React, { useMemo } from "react";
import "./Group.css";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { GroupAddOutlined } from "@mui/icons-material";
import { stringAvatar } from "../../utils/stringAvatar";

const Group = ({ group, onAddMemberToGroup }) => {
  const name = useMemo(() => {
    return stringAvatar(group.name)
  }, [group.name])
  
    return (
      <ListItem
        style={{ ...cardStyle }}
        secondaryAction={
          <IconButton onClick={() => onAddMemberToGroup(group.name)}>
            <GroupAddOutlined />
          </IconButton>
        }
      >
        <Avatar {...name} name />
        <ListItemText primary={group.name} />
      </ListItem>
    );
  
}


const cardStyle = {
  padding: 16,
  display: "flex",
  flexDirection: "row",
  gap: 16,
  width: '40%'
};

export default Group;