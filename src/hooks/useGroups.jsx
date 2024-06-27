import { useContext, useEffect, useState } from 'react'
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../auth/AuthContextProvider';
import { databaseFirestore } from '../configs/firebase';
import { joinGroup, leaveGroup } from '../api/api';

const useGroups = () => {
    const { user } = useContext(AuthContext)
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(true)

    const onAddMemberToGroup = async (groupName) => {
        await joinGroup(groupName, user)
    }
    
    const getGroups = () => {
        const unsubscribe = onSnapshot(collection(databaseFirestore, "groups"), (snapshot) => {
            const groups = []
            snapshot.docs.forEach((doc) => {
                groups.push(doc.data());
            });
            setGroups(groups)
        });

        return unsubscribe
    }

    const onLeaveGroup = async (groupName) => {
        await leaveGroup(groupName, user)
    }

    useEffect(() => {
        const unsubscribe = getGroups()
        return () => unsubscribe()
    }, [user])

    return (
        { onAddMemberToGroup, groups, onLeaveGroup }
    )
}

export default useGroups