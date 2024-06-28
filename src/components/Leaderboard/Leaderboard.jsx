import { Card, List, Typography, hexToRgb } from "@mui/material";
import React from "react";
import Leader from "../Leader/Leader";

const Leaderboard = ({ groups, onLeaveGroup, onAddMemberToGroup, user, onGroupPress }) => {
  return (
    <Card style={leaderboardContainerStyle}>
      <Typography color={"background.onBackground"} variant="h3" align="center">
        Leaderboard
      </Typography>
      <List>
        {groups &&
          groups.map((group, position) => (
            <Leader
              onGroupPress={onGroupPress}
              key={group.name}
              onAddMemberToGroup={onAddMemberToGroup}
              onLeaveGroup={onLeaveGroup}
              position={++position}
              group={group}
              user={user}
            />
          ))}
      </List>
    </Card>
  );
};

const leaderboardContainerStyle = {
  paddingLeft: 32,
  paddingRight: 16,
  paddingTop: 16,
  paddingBottom: 16,
};

export default Leaderboard;
