import { Avatar, Badge, Card, Modal, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchEntireGroup } from "../api/api";
import { notificationType } from "./toastType";
import Loading from "../components/Loading/Loading";
import { stringAvatar } from "../utils/stringAvatar";

const loadingGroups = { isLoading: true, group: null };

const GroupDialog = ({ groupId, show, onClose, notify }) => {
  const [groupState, setGroupState] = useState(loadingGroups);
  const { group, isLoading } = groupState;

  useEffect(() => {
    if (!show) return;
    fetchGroup(groupId);
  }, [groupId]);

  const closeDialog = () => {
    setGroupState(loadingGroups)
    onClose()
  }

  const fetchGroup = async (groupId) => {
    try {
      const group = await fetchEntireGroup(groupId);
      setGroupState({ isLoading: false, group: group });
    } catch (e) {
      notify("Error cargando grupo", notificationType.error);
      closeDialog();
    }
  };

  return (
    <Modal
      onClose={closeDialog}
      open={show}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <Loading style={{ width: "40%", height: "30%" }} />
      ) : (
        <Card
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "30%"
          }}
        >
          <Avatar {...stringAvatar(group.name)} style={{height: 56, width: 56}} />
          <Typography variant="h4" color={'background.onBackground'}>{group.name}</Typography>
          <section style={{display: "flex", marginTop: 16, gap: 8, justifyContent: "center", width: "100%", flexWrap: "wrap"}}>
            {group.users.map((user) => (
              <Tooltip title={user.displayName}>
                <Avatar src={user.photoUrl} />
              </Tooltip>
            ))}
          </section>
        </Card>
      )}
    </Modal>
  );
};

export default GroupDialog;
