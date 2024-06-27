import { useTheme } from "@emotion/react";
import { List } from "@mui/material";
import Group from "../Group/Group";

const GroupList = ({ groups, onAddMemberToGroup, onLeaveGroup, user }) => {
  const theme = useTheme();

  return (
    <List
      style={{
        ...groupListStyle,
        backgroundColor: theme.palette.background.default,
        flexGrow: 2,
      }}
    >
      {groups.map((group) => (
        <Group
          key={group.name}
          onLeaveGroup={onLeaveGroup}
          group={group}
          user={user}
          onAddMemberToGroup={onAddMemberToGroup}
        />
      ))}
    </List>
  );
};

const groupListStyle = {
  height: "100%",
  width: "auto",
  overflowY: "scroll",
};

export default GroupList;
