import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContextProvider";
import { Background } from "../components/Background/Background";
import GroupList from "../components/GroupsList/GroupsList";
import useGroups from "../hooks/useGroups";
import { IconButton } from "@mui/material";
import { GroupAddRounded } from "@mui/icons-material";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import useLeaderboard from "../hooks/useLeaderboard";

const GroupPage = () => {
  const { user, signIn, logout } = useContext(AuthContext);
  const { onAddMemberToGroup, onCreateGroup, groups } = useGroups();
  const { leaderboardGroups, isLoading } = useLeaderboard()

  if (!user) {
    return <button onClick={signIn}>login</button>;
  }

  return (
    <Background style={backgroundStyle}>
      <section style={{flexGrow: 1, display: "flex"}}>
        <IconButton onClick={() => onCreateGroup("grupaso 2")}>
          <GroupAddRounded color="primary"/>
        </IconButton>
        <GroupList
          groups={groups}
          onAddMemberToGroup={onAddMemberToGroup}
          user={user}
        />
      </section>
      <Leaderboard onAddMemberToGroup={onAddMemberToGroup} groups={leaderboardGroups} />
    </Background>
  );
};

const backgroundStyle = {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: 16,
  padding: 32,
  boxSizing: "border-box"
};

export default GroupPage;
