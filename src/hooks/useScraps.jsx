import { collection, onSnapshot } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { databaseFirestore } from '../configs/firebase'
import { recolectScrap as recolectScrapApi } from '../api/api'
import { DialogContext } from '../dialogs/DialogContextProvider'
import { notificationType } from '../dialogs/toastType'
import 'react-toastify/dist/ReactToastify.css';

const useScraps = () => {
    const [scraps, setScraps] = useState([])
    const { notify } = useContext(DialogContext)

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
        if(!user.group) { 
            return notify("El usuario debe de tener un grupo para jugar", notificationType.error) 
        }
        try {
            await recolectScrapApi(coordinates, user)
            notify("+10", notificationType.success)
        } catch(e) {
            notify(":(", notificationType.error)
        }
    }

    return { scraps, recolectScrap }
}

export default useScraps