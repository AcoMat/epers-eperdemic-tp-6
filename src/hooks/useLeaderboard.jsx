import { useEffect, useState } from "react"
import { databaseFirestore } from "../configs/firebase"
import { collection, doc, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore"

const leaderboardInitialState = {isLoading: true, groups: null}

const useLeaderboard = () => {
    const [groups, setGroups] = useState(leaderboardInitialState)
    const {groups: leaderboardGroups, isLoading} = groups

    useEffect(() => {
        return fetchLeaderboard()
    }, [])

    const fetchLeaderboard = () => {
        const groupsCollecion = collection(databaseFirestore, "groups")
        const q = query(groupsCollecion, orderBy("points"), limit(5))
        const unsuscribe = onSnapshot(q, (querySnapshot) => {
            let leaders = []
            querySnapshot.forEach(leader => {
                leaders.push(leader.data()) 
            })
            setGroups({isLoading: false, groups: leaders})
        })
        return unsuscribe
    }

    return { isLoading, leaderboardGroups }
}

export default useLeaderboard