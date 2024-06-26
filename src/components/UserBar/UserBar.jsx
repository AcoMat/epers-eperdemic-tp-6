import React, { useContext, useState } from "react";
import { Card, IconButton } from "@mui/material";
import "./UserBar.css";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import ToggleModeButton from "../ToggleModeButton/ToggleModeButton";
import UserInfo from "../UserInfo/UserInfo";
import { AuthContext } from "../../auth/AuthContextProvider";
import { DialogContext } from "../../dialogs/DialogContextProvider";

const UserBar = () => {
  const [hide, setHide] = useState(false)
  const { user, logout, signIn } = useContext(AuthContext);
  const { showUserProfile } = useContext(DialogContext)
  const toggleHide = () => {
    setHide(hide => !hide)
  }

  const onUserAvatarPress = () => {
    showUserProfile(user.uid)
  }

  const hideStyle = hide ? 
    { padding: 4, borderRadius: "50%", opacity: 0.8 } : 
    {
      borderRadius: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8,
    }


  return (
    <Card elevation={1} style={{...backgroundStyle, ...hideStyle}}>
      <IconButton onClick={toggleHide}> 
        { hide ? <ArrowBackIosOutlined style={hideIconStyle} color="primary" /> : <ArrowForwardIosOutlined color="primary" /> }
      </IconButton>
      {
        !hide && <> 
                  <ToggleModeButton />
                  <UserInfo onUserClick={onUserAvatarPress} user={user} logout={logout} signIn={signIn} /> 
                </>
      }
      
    </Card>
  );
};

const backgroundStyle = {
  marginTop: 8,
  marginRight: 8,
  display: "flex",
  flexDirection: "row",
  gap: 8,
  position: "absolute",
  right: "0",
  top: "0",
  zIndex: 10,
};

const hideIconStyle = {
  height: 12,
  width: 12
}

export default UserBar;
