import React from "react";
import Group from "../Group/Group";
import { Typography } from "@mui/material";

const Leader = ({ group, position, onLeaveGroup, onAddMemberToGroup, user, onGroupPress }) => {
  return (
    <div style={leaderContainerStyle}>
      <div>
        <Typography
          color={"background.onBackground"}
          variant="h5"
        >{`#${position}`}</Typography>
      </div>
      <Group
        onGroupPress={onGroupPress}
        onAddMemberToGroup={onAddMemberToGroup}
        onLeaveGroup={onLeaveGroup}
        points={group.points}
        group={group}
        user={user}
      />
    </div>
  );
};

const leaderContainerStyle = {
  display: "flex",
  width: "100%",
  alignItems: "center",
};

export default Leader;
