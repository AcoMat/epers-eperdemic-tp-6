import { useContext, useEffect, useState } from 'react'
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../auth/AuthContextProvider';
import { databaseFirestore } from '../configs/firebase';

const useGroups = () => {
    const { user } = useContext(AuthContext)
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(true)

    const onCreateGroup = async (nameGroup) => {
        if(!user) return;
        const groupToCreate = doc(databaseFirestore, "groups", nameGroup)
        await setDoc(groupToCreate, {
            name: nameGroup,
            lider: user,
            members: [user]
        })
        if (user.group) {
            const groupToDeleteMember = doc(databaseFirestore, "groups", user.group)
            await updateDoc(groupToDeleteMember, {
                members: arrayRemove(user)

            })
        }
        const userRef = doc(databaseFirestore, "users", user.uid)
            await updateDoc(userRef, {
                group: nameGroup
            })
    }

    const onAddMemberToGroup = async (nameGroup) => {
        if(!user) return;
        const groupToCreate = doc(databaseFirestore, "groups", nameGroup)
        await updateDoc(groupToCreate, {
            members: arrayUnion(user)
        })
        if (user.group) {
            const groupToDeleteMember = doc(databaseFirestore, "groups", user.group)
            await updateDoc(groupToDeleteMember, {
                members: arrayRemove(user)

            })
        }
        const memberRef = doc(databaseFirestore, "users", user.uid)
        await updateDoc(memberRef, {
            group: nameGroup
        })
    }

    
    const getGroups = () => {
        const unsubscribe = onSnapshot(collection(databaseFirestore, "groups"), (snapshot) => {
            const groups = []
            snapshot.forEach((doc) => {
                groups.push(doc.data());
            });
            setGroups(groups)
        });

        return unsubscribe
    }

    useEffect(() => {
        const unsubscribe = getGroups()

        return unsubscribe()
    }, [user])

    return (
        { onCreateGroup, onAddMemberToGroup, groups }
    )
}

export default useGroups