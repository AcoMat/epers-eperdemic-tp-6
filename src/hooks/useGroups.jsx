import { useContext, useState } from 'react'
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../auth/AuthContextProvider';
import { databaseFirestore } from '../configs/firebase';

const useGroups = () => {
    const { user } = useContext(AuthContext)
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(true)

    const onCreateGroup = async (nameGroup) => {
        if(!user) return;
        const groupToCreate = doc(databaseFirestore, "group", nameGroup)
        await setDoc(groupToCreate, {
            name: nameGroup,
            lider: user.displayName,
            members: [user]
        })
        if (user.group) {
            const groupToDeleteMember = doc(databaseFirestore, "group", user.group)
            await updateDoc(groupToDeleteMember, {
                members: arrayRemove(user)

            })
        }
        const userRef = doc(databaseFirestore, "users", user.uid)
            await updateDoc(userRef, {
                group: nameGroup
            })
    }

    const onAddMemberToGroup = async (member, nameGroup) => {
        const groupToCreate = doc(databaseFirestore, "group", nameGroup)
        await updateDoc(groupToCreate, {
            members: arrayUnion(member)
        })
        if (member.group) {
            const groupToDeleteMember = doc(databaseFirestore, "group", member.group)
            await updateDoc(groupToDeleteMember, {
                members: arrayRemove(member)

            })
        }
        const userRef = doc(databaseFirestore, "users", member.uid)
        await updateDoc(userRef, {
            group: nameGroup
        })
    }

    return (
        { onCreateGroup, onAddMemberToGroup }
    )
}

export default useGroups