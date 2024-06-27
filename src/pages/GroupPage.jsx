import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContextProvider";
import { Background } from "../components/Background/Background";
import GroupList from "../components/GroupsList/GroupsList";
import useGroups from "../hooks/useGroups";
import { Fab } from "@mui/material";
import { GroupAddRounded, GroupsRounded } from "@mui/icons-material";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import useLeaderboard from "../hooks/useLeaderboard";
import { DialogContext } from "../dialogs/DialogContextProvider";

const GroupPage = () => {
  const { user } = useContext(AuthContext);
  const { onLeaveGroup, onAddMemberToGroup, groups } = useGroups();
  const { leaderboardGroups } = useLeaderboard();
  const { showCreateGroup } = useContext(DialogContext);

  return (
    <Background style={backgroundStyle}>
      <Fab
        color="primary"
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          marginBottom: "24px",
          marginLeft: "24px",
        }}
        onClick={showCreateGroup}
        variant="circular"
      >
        <GroupsRounded />
      </Fab>
      <section style={{ flexGrow: 1, display: "flex" }}>
        <GroupList
          groups={groups}
          onAddMemberToGroup={onAddMemberToGroup}
          onLeaveGroup={onLeaveGroup}
          user={user}
        />
      </section>
      <Leaderboard
        onLeaveGroup={onLeaveGroup}
        onAddMemberToGroup={onAddMemberToGroup}
        groups={leaderboardGroups}
        user={user}
      />
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
  boxSizing: "border-box",
};

export default GroupPage;
