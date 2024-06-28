import { useTheme } from "@emotion/react";
import { List } from "@mui/material";
import Group from "../Group/Group";

const GroupList = ({ className, groups, onAddMemberToGroup, onLeaveGroup, user, onGroupPress }) => {
  const theme = useTheme();

  return (
    <List
      className={className}
      style={{
        ...groupListStyle,
        backgroundColor: theme.palette.background.default
      }}
    >
      {groups.map((group) => (
        <Group
          onGroupPress={onGroupPress}
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
  overflowY: "scroll",
};

export default GroupList;
