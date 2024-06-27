import React, { useMemo } from "react";
import "./Group.css";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { GroupAddOutlined, GroupRemoveOutlined } from "@mui/icons-material";
import { stringAvatar } from "../../utils/stringAvatar";

const Group = ({ group, onAddMemberToGroup, points, onLeaveGroup, user }) => {
  const name = useMemo(() => {
    return stringAvatar(group.name);
  }, [group.name]);

  const userInGroup = group.members.some(member => {
    const path = member._key.path.segments
    const id = path[path.length - 1]
    return id === user.uid
  })

  return (
    <ListItem
      style={cardStyle}
      secondaryAction={
        userInGroup ? 
          (<IconButton onClick={() => onLeaveGroup(group.name)}> 
            <GroupRemoveOutlined /> 
          </IconButton>) :
          (<IconButton onClick={() => onAddMemberToGroup(group.name)}>
            <GroupAddOutlined />
          </IconButton>) 
      }
    >
      <ListItemAvatar>
        <Avatar style={{ height: 56, width: 56 }} {...name} name />
      </ListItemAvatar>
      {
        points !== undefined ?
          <ListItemText
            secondary={group.name}
            primaryTypographyProps={{color: "background.onBackground", fontWeight: 600}}
            secondaryTypographyProps={{color: "background.onBackground"}}
            primary={points === undefined ? null : `Puntos: ${points}`}/>
          :
          <ListItemText
            primary={group.name} />
      }
      
    </ListItem>
  );
};

const cardStyle = {
  padding: 16,
  display: "flex",
  flexDirection: "row",
  gap: 16,
  width: "100%",
};

export default Group;
