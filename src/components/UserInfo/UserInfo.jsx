import { Button } from "@mui/material";
import React from "react";
import AvatarWithStatus from "../AvatarWithStatus/AvatarWithStatus";

const UserInfo = ({ user, logout, signIn, onUserClick }) => {
  if (user) {
    return (
      <>
        <Button variant="contained" onClick={logout}>
          Cerrar sesion
        </Button>
        <AvatarWithStatus onClick={onUserClick} user={user} />
      </>
    );
  } else {
    <Button onClick={signIn} variant="contained">
      Iniciar sesion
    </Button>;
  }
};

export default UserInfo;
