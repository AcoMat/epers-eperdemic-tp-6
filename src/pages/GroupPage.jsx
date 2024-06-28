import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContextProvider";
import { Background } from "../components/Background/Background";
import GroupList from "../components/GroupsList/GroupsList";
import useGroups from "../hooks/useGroups";
import { Fab } from "@mui/material";
import { GroupsRounded } from "@mui/icons-material";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import useLeaderboard from "../hooks/useLeaderboard";
import { DialogContext } from "../dialogs/DialogContextProvider";
import Loading from "../components/Loading/Loading";
import './GroupPage.css'

const GroupPage = () => {
  const { user } = useContext(AuthContext);
  const { onLeaveGroup, onAddMemberToGroup, groups, loading } = useGroups();
  const { leaderboardGroups } = useLeaderboard();
  const { showCreateGroup, showGroupWithId } = useContext(DialogContext);

  return (
    <Background className="group-page-container">
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
      {
        loading ?
          <Loading className="group-page-group-list-container-loader" />
          : 
        <GroupList
          className='group-page-group-list-container'
          groups={groups}
          onGroupPress={showGroupWithId}
          onAddMemberToGroup={onAddMemberToGroup}
          onLeaveGroup={onLeaveGroup}
          user={user}
        />
      }
      <Leaderboard
        onGroupPress={showGroupWithId}
        onLeaveGroup={onLeaveGroup}
        onAddMemberToGroup={onAddMemberToGroup}
        groups={leaderboardGroups}
        user={user}
      />
    </Background>
  );
};

export default GroupPage;
