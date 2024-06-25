import { useContext, useEffect, useState } from 'react'
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../auth/AuthContextProvider';
import { databaseFirestore } from '../configs/firebase';

const useGroups = () => {
    const { user } = useContext(AuthContext)
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(true)

    const onCreateGroup = async (groupName) => {
        if(!user) return;
        const groupToCreate = doc(databaseFirestore, "groups", groupName)
        await setDoc(groupToCreate, {
            name: groupName,
            lider: user.uid,
            members: [user.uid]
        })
        if (user.group && user.group !== groupName) {
            const groupToDeleteMember = doc(databaseFirestore, "groups", user.group)
            await updateDoc(groupToDeleteMember, {
                members: arrayRemove(user.uid)
            })
        }
        const userRef = doc(databaseFirestore, "users", user.uid)
        await updateDoc(userRef, {
            group: groupName
        })
    }

    const onAddMemberToGroup = async (groupName) => {
        if(!user) return;
        const groupToCreate = doc(databaseFirestore, "groups", groupName)
        await updateDoc(groupToCreate, {
            members: arrayUnion(user.uid)
        })
        if (user.group && user.group !== groupName) {
            const groupToDeleteMember = doc(databaseFirestore, "groups", user.group)
            await updateDoc(groupToDeleteMember, {
                members: arrayRemove(user.uid)

            })
        }
        const memberRef = doc(databaseFirestore, "users", user.uid)
        await updateDoc(memberRef, {
            group: groupName
        })
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

    useEffect(() => {
        const unsubscribe = getGroups()

        return () => unsubscribe()
    }, [user])

    return (
        { onCreateGroup, onAddMemberToGroup, groups }
    )
}

export default useGroups