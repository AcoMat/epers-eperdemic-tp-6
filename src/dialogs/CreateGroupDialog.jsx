import { Avatar, Button, Card, Modal, OutlinedInput } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { stringAvatar } from "../utils/stringAvatar";
import { createGroup as createGroupApi } from '../api/api'
import { DialogContext } from "./DialogContextProvider";
import { notificationType } from "./toastType";

const CreateGroupDialog = ({ show, onClose, user }) => {
    const [name, setName] = useState("")
    const createActive = name.trim().length >= 5
    const { notify, close } = useContext(DialogContext)
    
    const avatarProps = useMemo(() => {
        if(name.trim() === "") return {}
        return stringAvatar(name.trim())
    }, [name])

    const onNameChanged = ({target}) => {
        setName(target.value)
    }

    const createGroup = async () => {
      const loading = notify("Cargando...", notificationType.loading)
      try {
        await createGroupApi(name.trim(), user)
        onClose()
        notify("Grupo creado exitosamente", notificationType.success)
      } catch(e) {
        notify("Ha ocurrido un error creando el grupo", notificationType.error)
      } finally {
        close(loading)
      }
    }

    useEffect(() => {
        if (!show) return;
        setName("")
    }, [show]);

  return (
    <Modal
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={show}
      onClose={onClose}
    >
        <Card style={{padding: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 16}}>
            <Avatar {...avatarProps} style={{height: 64, width: 64}} />
            <OutlinedInput placeholder="Nombre del grupo" title="Nombre" sx={{color: "white"}} color="secondary" onChange={onNameChanged} value={name} />
            <div style={{display: "flex", width: "100%", gap: 8}}>
                <Button onClick={onClose} sx={{flexGrow: 1, width: "50%"}} variant="outlined">Cancelar</Button>
                <Button onClick={createGroup} disabled={!createActive} sx={{flexGrow: 1, width: "50%"}} variant="contained">Crear</Button>
            </div>
        </Card>
    </Modal>
  );
};

export default CreateGroupDialog;
