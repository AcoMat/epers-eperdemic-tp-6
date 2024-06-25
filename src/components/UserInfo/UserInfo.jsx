import { Button } from '@mui/material';
import React, { useContext } from 'react'
import AvatarWithStatus from '../AvatarWithStatus/AvatarWithStatus';
import { AuthContext } from '../../auth/AuthContextProvider';

const UserInfo = () => {
const { user, logout, signIn } = useContext(AuthContext);

    if(user) {
        return (
            <>
                <Button variant="contained" onClick={logout}>
                Cerrar sesion
                </Button>
                <AvatarWithStatus user={user} />
            </>
        )
    } else {
          <Button onClick={signIn} variant="contained">Iniciar sesion</Button>
    }
}

export default UserInfo