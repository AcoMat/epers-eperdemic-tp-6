import { useContext, useEffect, useState } from 'react'
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../auth/AuthContextProvider';
import { databaseFirestore } from '../configs/firebase';
import { estaInfectadoConCache } from '../auth/estaInfectadoConCache';
import { DialogContext } from '../dialogs/DialogContextProvider';
import { notificationType } from '../dialogs/toastType';

const useFriends = () => {
    const { user } = useContext(AuthContext)
    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(true)
    const { notify, close } = useContext(DialogContext)
    
    const changeUser = (user) => {
        setLoading(false)
        setFriends(friends => {
            const alreadyHasFriend = friends.some(friend => friend.uid === user.uid)
            if(alreadyHasFriend) {
                return friends.map((friend) => friend.uid === user.uid ? user : friend)
            }
            return [...friends, user];
        })
    }

    const deleteNotLongerFriends = (uids) => {
        const mappedUids = uids.map(uid => {
            const path = uid._key.path.segments
            const id = path[path.length - 1]
            return id
        })
        setFriends(friends => friends.filter((friend) => mappedUids.includes(friend.uid)))
    }

    const onRemoveFriend = async (friend) => {
        if(!user) return;
        const loader = notify("Cargando...", notificationType.loading)
        try {
            const friendRef = doc(databaseFirestore, "users", friend.uid)
            const userRef = doc(databaseFirestore, "users", user.uid)
            await updateDoc(userRef, {
                friendsIds: arrayRemove(friendRef)
            })
            notify("Amigo eliminado exitosamente", notificationType.success)
        } catch(e) {
            notify("Ocurrió un error eliminando a un amigo", notificationType.error)
        } finally {
            close(loader)
        }
    }

    const onAddFriend = async (userToAdd) => {
        if(!user) return;
        const loader = notify("Cargando...", notificationType.loading)
        try {
            const userToAddRef = doc(databaseFirestore, "users", userToAdd.uid)
            const userRef = doc(databaseFirestore, "users", user.uid)
            await updateDoc(userRef, {
                friendsIds: arrayUnion(userToAddRef)
            })
            notify("Amigo agregado exitosamente", notificationType.success)
        } catch(e) {
            notify("Ocurrió un error agregando a un amigo", notificationType.error)
        } finally {
            close(loader)
        }
    }

    useEffect(() => {
        if(!user) return;
        deleteNotLongerFriends(user.friendsIds)
        const callbacks = user.friendsIds.map(friendReference => {
            return onSnapshot(friendReference, (doc) => {
                const path = friendReference._key.path.segments
                const id = path[path.length - 1]
                changeUser({...doc.data(), uid: id, estaInfectado: null})
                setEstaInfectado(doc.data().vectorId, id)
            })
        })
        if(user?.friendsIds?.length === 0) { setLoading(false) }
        return () => { callbacks.forEach(callback => callback()) } 
    }, [user])

    const setEstaInfectado = async (vectorId, friendUid) => {
        try {
            const estaInfectado = await estaInfectadoConCache(vectorId)
            setFriends(friends => {
                const mappedFriends = friends.map(friend => {
                    return friend.uid === friendUid ? {...friend, estaInfectado: estaInfectado} : friend
                })
                return mappedFriends
            })
        } catch(e) { console.log("Error recuperando estado infectado") }
    }

    return (
        { friends, onRemoveFriend, loading, onAddFriend }
    )
}

export default useFriends