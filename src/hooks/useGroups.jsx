import { useContext, useEffect, useState } from 'react'
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../auth/AuthContextProvider';
import { databaseFirestore } from '../configs/firebase';
import { joinGroup, leaveGroup } from '../api/api';
import { notificationType } from '../dialogs/toastType';
import { DialogContext } from '../dialogs/DialogContextProvider';

const useGroups = () => {
    const { user } = useContext(AuthContext)
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(true)
    const { notify, close } = useContext(DialogContext)

    const onAddMemberToGroup = async (groupName) => {
        const loading = notify("Cargando...", notificationType.loading)
        try {
            await joinGroup(groupName, user)
            notify("Te uniste exitosamente al grupo", notificationType.success)
        } catch(e) {
            notify("Ha ocurrido un error uniéndote al grupo", notificationType.error)
        } finally {
            close(loading)
        }
    }
    
    const getGroups = () => {
        const unsubscribe = onSnapshot(collection(databaseFirestore, "groups"), (snapshot) => {
            const groups = []
            snapshot.docs.forEach((doc) => {
                groups.push(doc.data());
            });
            setLoading(false)
            setGroups(groups)
        });

        return unsubscribe
    }

    const onLeaveGroup = async (groupName) => {
        const loader = notify("Cargando...", notificationType.loading)
        try {
            await leaveGroup(groupName, user)
            notify("Has salido exitosamente de " + groupName, notificationType.success)
        } catch(e) {
            notify("Has ocurrido un problema saliendo de " + groupName, notificationType.error)
        } finally {
            close(loader)
        }
    }

    useEffect(() => {
        const unsubscribe = getGroups()
        return () => unsubscribe()
    }, [user])

    return (
        { onAddMemberToGroup, groups, onLeaveGroup, loading }
    )
}

export default useGroups