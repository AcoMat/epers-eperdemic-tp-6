import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { databaseFirestore } from '../configs/firebase'
import { recolectScrap as recolectScrapApi } from '../api/api'

const useScraps = () => {
    const [scraps, setScraps] = useState([])
  
    useEffect(() => {
        const scrapRef = collection(databaseFirestore, "scraps")
        const unsuscribe = onSnapshot(scrapRef, (snapshot) => {
            const scraps = []
            snapshot.forEach((scrap) => {
                scraps.push({...scrap.data(), ref: scrap.ref})
            })
            setScraps(scraps)
        })
        return unsuscribe
    }, [])

    const recolectScrap = async (coordinates, user) => {
        await recolectScrapApi(coordinates, user)
    }

    return { scraps, recolectScrap }
}

export default useScraps