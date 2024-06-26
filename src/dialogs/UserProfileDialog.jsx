import { Box, Card, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUser } from "../api/api";
import AvatarWithStatus from '../components/AvatarWithStatus/AvatarWithStatus'
import Loading from '../components/Loading/Loading'
import TextSection from "../components/TextSection/TextSection";
import { BugReportOutlined, CoronavirusOutlined, LocationOnRounded } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const loadingUserData = { isLoading: true, user: null };
const errorUserData = {isLoading: false, user: null}

const UserProfileDialog = ({ uid, show, onClose }) => {
  const [userData, setUserData] = useState(loadingUserData);
  const { isLoading, user} = userData 
  const ubicacion = user?.location ? `Longitud: ${user.location.longitude}, Latitud: ${user.location.latitude}` : "No definida"
  const virus = user?.contagios?.map(contagio => contagio.nombre).join(", ") || "No posee"
  const mutaciones = user?.mutaciones?.map(mutacion => mutacion.tipo).join(", ") || "No posee"
  const theme = useTheme()

  useEffect(() => {
    if(!show) return;
    setUserData(loadingUserData)
    fetchUser(uid)
  }, [show, uid]);

  const fetchUser = async (uid) => {
    const user = await getUser(uid)
    setUserData({isLoading: false, user: user})
  }

  return (
    <Modal style={{display: "flex", justifyContent: "center", alignItems: "center"}} open={show} onClose={onClose} >
        {
            isLoading 
                ? <Loading />
                : <Card style={{padding: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 8}}>
                    <span>
                        <AvatarWithStatus avatarStyle={{height: 56, width: 56}} user={userData.user} />
                    </span>
                    <Typography style={{marginBottom: 8}} color={"background.onBackground"} variant="h5"> {user.displayName} </Typography>
                    <TextSection title={"Ubicacion:"} text={ubicacion} icon={<LocationOnRounded sx={{color: "background.onBackground"}} /> } />
                    <TextSection title={"Virus:"} text={virus} icon={<CoronavirusOutlined sx={{color: "background.onBackground"}} /> } />
                    <TextSection title={"Mutaciones:"} text={mutaciones} icon={<BugReportOutlined sx={{color: "background.onBackground"}} /> } />
                  </Card>
        }
    </Modal>
  )
};

export default UserProfileDialog;
