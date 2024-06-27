import { Card, List, Typography } from "@mui/material";
import React from "react";
import Leader from "../Leader/Leader";

const Leaderboard = ({ groups, onAddMemberToGroup }) => {
  return (
    <Card style={leaderboardContainerStyle}>
      <Typography color={"background.onBackground"} variant="h3" align="center">
        Leaderboard
      </Typography>
      <List>
        {groups &&
          groups.map((group, position) => (
            <Leader
              onAddMemberToGroup={onAddMemberToGroup}
              position={++position}
              group={group}
            />
          ))}
      </List>
    </Card>
  );
};

const leaderboardContainerStyle = {
  height: "auto",
  paddingLeft: 32,
  paddingRight: 16,
  paddingTop: 16,
  paddingBottom: 16,
  width: "40%",
  overflowY: "scroll",
};

export default Leaderboard;
