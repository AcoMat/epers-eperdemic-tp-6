import React, { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, databaseFirestore } from '../configs/firebase';

const useFriends = () => {
    const [user, loading, error] = useAuthState(auth);

    const [friends, setFriends] = useState([])


    useEffect(() => {
        if(!user) {
            return
        }
        console.log(user.user)
        const userFriendsRef = collection(databaseFirestore, 'users', user.uid, 'friendsIds')
        const mquery = query(collection(databaseFirestore, 'users'), where("uid", "in", userFriendsRef))
        const unsubscribe = onSnapshot(mquery, (querySnapshot) => {
            const friends = [];
            querySnapshot.forEach((doc) => {
                friends.push(doc.data());
            });
            setFriends(friends)
        });
        return () => { unsubscribe() }
    }, [user])

    return (
        { friends }
    )
}

export default useFriends