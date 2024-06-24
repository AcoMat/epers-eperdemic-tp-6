import { useContext, useEffect, useRef, useState } from 'react'
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../auth/AuthContextProvider';
import { databaseFirestore } from '../configs/firebase';

const useFriends = () => {
    const { user, logout } = useContext(AuthContext)
    const unsuscribeUpdateFriendCallbacks = useRef([])
    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(true)

    const changeUser = (user) => {
        setLoading(false)
        if(!friends.includes(friend => friend.uid === user.uid)){
            setFriends(friends => [...friends, user]);
        } else {
            setFriends(friends => friends.map((friend) => friend.uid === user.uid ? user : friend))
        }
    }

    const deleteNotLongerFriends = (uids) => {
        setFriends(friends => friends.filter((friend) => friend.uid in uids))
    }

    const onRemoveFriend = async (friend) => {
        if(!user) return;
        const friendRef = doc(databaseFirestore, "users", friend.uid)
        const userRef = doc(databaseFirestore, "users", user.uid)
        await updateDoc(userRef, {
            friendsIds: arrayRemove(friendRef)
        })
    }

    useEffect(() => {
        if(!user) return;
        deleteNotLongerFriends(user.friendsIds)
        const callbacks = user.friendsIds.map(friendReference => {
            return onSnapshot(friendReference, (doc) => {
                const path = friendReference._key.path.segments
                const id = path[path.length - 1]
                console.log(doc.data())
                changeUser({...doc.data(), uid: id,})
            })
        })
        unsuscribeUpdateFriendCallbacks.current = callbacks
        return () => { unsuscribeUpdateFriendCallbacks.current.forEach(callback => callback()) } 
    }, [user])

    return (
        { friends, onRemoveFriend, loading }
    )
}

export default useFriends