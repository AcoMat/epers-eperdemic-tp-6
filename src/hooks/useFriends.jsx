import { useContext, useEffect, useRef, useState } from 'react'
import { onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../auth/AuthContextProvider';

const useFriends = () => {
    const { user, logout } = useContext(AuthContext)
    const unsuscribeUpdateFriendCallbacks = useRef([])
    const [friends, setFriends] = useState([])

    const changeUser = (user) => {
        if(!friends.includes(friend => friend.uid === user.uid)){
            setFriends(friends => [...friends, user]);
        } else {
            setFriends(friends => friends.map((friend) => friend.uid === user.uid ? user : friend))
        }
    }

    const deleteNotLongerFriends = (uids) => {
        setFriends(friends => friends.filter((friend) => friend.uid in uids))
    }

    useEffect(() => {
        console.log(user)
        if(!user) return;
        deleteNotLongerFriends(user.friendsIds)
        const callbacks = user.friendsIds.map(friendReference => {
            return onSnapshot(friendReference, (doc) => {
                const path = friendReference._key.path.segments
                const id = path[path.length - 1]
                changeUser({...doc.data(), uid: id,})
            })
        })
        unsuscribeUpdateFriendCallbacks.current = callbacks
        return () => { unsuscribeUpdateFriendCallbacks.current.forEach(callback => callback()) } 
    }, [user])

    return (
        { friends }
    )
}

export default useFriends