import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContextProvider";
import { Background } from "../components/Background/Background";
import GroupList from "../components/GroupsList/GroupsList";
import useGroups from "../hooks/useGroups";

const GroupPage = () => {
  const { user, signIn, logout } = useContext(AuthContext);
  const { onAddMemberToGroup, onCreateGroup, groups } = useGroups();

  if (!user) {
    return <button onClick={signIn}>login</button>;
  }

  return (
    <Background style={backgroundStyle}>
      <GroupList
        groups={groups}
        onAddMemberToGroup={onAddMemberToGroup}
        user={user}
      />
    </Background>
  );
};

const backgroundStyle = {
  boxSizing: "border-box",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  overflowY: "hidden",
  padding: 16,
  gap: 16,
};

export default GroupPage;
