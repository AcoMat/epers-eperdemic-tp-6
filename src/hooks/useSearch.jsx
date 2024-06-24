import { and, collection, getDocs, onSnapshot, or, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { databaseFirestore } from '../configs/firebase'

const useSearch = (initialSearch) => {
    const [search, setSearch] = useState(initialSearch)
    const [users, setUsers] = useState([])

    useEffect(() => {
        return doSearch()
    }, [search])

    const doSearch = () => {
        if(search.length === 0) return (() => {});
        var strlength = search.length;
        var strFrontCode = search.slice(0, strlength-1);
        var strEndCode = search.slice(strlength-1, search.length);
        
        var startcode = search;
        var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

        const usersRef = collection(databaseFirestore, "users")
        const q = query(usersRef, and(
            where('displayName', '>=', startcode),
            where('displayName', '<', endcode)
        ))
        const unsuscribe = onSnapshot(q, (snapshot) => {
            const users = []
            snapshot.forEach((doc) => {
                users.push(doc.data())
            })
            setUsers(users)
        })
        return () => { unsuscribe() }
    }

    const changeSearch = ({target}) => {
        setSearch(target.value)
    }

  return (
    {users, changeSearch, search}
  )
}

export default useSearch