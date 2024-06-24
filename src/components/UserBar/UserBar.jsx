import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContextProvider";
import { Avatar, Button, Card, IconButton } from "@mui/material";
import "./UserBar.css";
import ColorModeContext from "../../theme/ColorModeContext";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

const UserBar = () => {
  const { user, logout, signIn } = useContext(AuthContext);
  const { mode, toggleMode } = useContext(ColorModeContext);

  return (
    <Card style={backgroundStyle}>
      <IconButton onClick={toggleMode}>
        {mode === "light" ? (
          <DarkModeOutlined color="primary" />
        ) : (
          <LightModeOutlined color="secondary" />
        )}
      </IconButton>
      {user ? (
        <>
            <Button variant="contained" onClick={logout}>
            Cerrar sesion
            </Button>
            <Avatar src={user?.photoURL} />
        </>
      ) : (
        <>
          <Button onClick={signIn} variant="contained">Iniciar sesion</Button>
        </>
      )}
    </Card>
  );
};

const backgroundStyle = {
  marginTop: 8,
  marginRight: 8,
  display: "flex",
  flexDirection: "row",
  gap: 8,
  borderRadius: 16,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 8,
  paddingBottom: 8,
  position: "absolute",
  right: "0",
  top: "0",
  zIndex: 10,
};

export default UserBar;
