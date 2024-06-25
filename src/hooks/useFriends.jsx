import { useContext, useEffect, useRef, useState } from 'react'
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../auth/AuthContextProvider';
import { databaseFirestore } from '../configs/firebase';
import { estaInfectadoConCache } from '../auth/estaInfectadoConCache';

const useFriends = () => {
    const { user } = useContext(AuthContext)
    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(true)

    const changeUser = (user) => {
        setLoading(false)
        if(!friends.some(friend => friend.uid === user.uid)){
            setFriends(friends => [...friends, user]);
        } else {
            setFriends(friends => friends.map((friend) => friend.uid === user.uid ? user : friend))
        }
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
        const friendRef = doc(databaseFirestore, "users", friend.uid)
        const userRef = doc(databaseFirestore, "users", user.uid)
        await updateDoc(userRef, {
            friendsIds: arrayRemove(friendRef)
        })
    }

    const onAddFriend = async (userToAdd) => {
        if(!user) return;
        const userToAddRef = doc(databaseFirestore, "users", userToAdd.uid)
        const userRef = doc(databaseFirestore, "users", user.uid)
        await updateDoc(userRef, {
            friendsIds: arrayUnion(userToAddRef)
        })
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
        return () => { callbacks.forEach(callback => callback()) } 
    }, [user])

    const setEstaInfectado = async (vectorId, friendUid) => {
        const estaInfectado = await estaInfectadoConCache(vectorId)
        setFriends(friends => {
            const mappedFriends = friends.map(friend => {
                return friend.uid === friendUid ? {...friend, estaInfectado: estaInfectado} : friend
            })
            return mappedFriends
        })
    }

    return (
        { friends, onRemoveFriend, loading, onAddFriend }
    )
}

export default useFriends