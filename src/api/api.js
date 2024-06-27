import axios from "axios"
import { arrayRemove, arrayUnion, collection, doc, getDoc, runTransaction, setDoc, updateDoc } from "firebase/firestore"
import { databaseFirestore } from "../configs/firebase"
import { get } from "firebase/database"

const url = process.env.REACT_APP_API_URL

const getMapItems = async (location, radius) => {
    const body = {
        distancia: radius,
        punto: {
            longitud: location.longitude,
            latitud: location.latitude
        }
    }
    const response = await axios.post(url + "/distrito/near", body)
    return response.data
}

const createVector = async ({type, ubicacionId}) => {
    const body = {
        type,
        ubicacionId
    }
    const response = await axios.post(url + "/vector", body)
    return response.data
}

const getVector = async ({vectorId}) => {
    const response = await axios.get(url + `/vector/${vectorId}`)
    return response.data
}

const isInfectado = async (vectorId) => {
    const response = await axios.get(url + `/vector/${vectorId}/estaInfectado`)
    return response.data
}

const getUser = async (uid) => {
    const userFirebaseDocRef = doc(databaseFirestore, "users", uid)
    const userFirebase = (await getDoc(userFirebaseDocRef)).data()
    const estaInfectado = await isInfectado(userFirebase.vectorId)
    const vectorInfo = await getVector({vectorId: userFirebase.vectorId})
    return {...userFirebase, ...vectorInfo, estaInfectado: estaInfectado}
}

const createUserIfNotInDatabase = async (user) => {
    const docRef = doc(databaseFirestore, "users", user.uid);
    const fetchedUser = await getDoc(docRef);
    if (!fetchedUser.exists()) {
      const vectorId = await createVector({ type: "HUMANO", ubicacionId: 1 });
      await setDoc(docRef, {
        vectorId: vectorId,
        friendsIds: [],
        photoUrl: user.photoURL,
        displayName: user.displayName,
        uid: user.uid 
      });
    }
  };

const createGroup = async (groupName, user) => {
    const userRef = doc(databaseFirestore, "users", user.uid)
    const groupRef = doc(databaseFirestore, "groups", groupName)
    const alreadyExists = (await getDoc(groupRef)).exists()
    if(alreadyExists) return;
    runTransaction(databaseFirestore, async (transaction) => {
        if(user.group) {
            await transaction.update(user.group, {
                members: arrayRemove(userRef)
            })
        }
        await transaction.set(groupRef, {
            name: groupName,
            members: arrayUnion(userRef),
            points: 0
        })
        await transaction.update(userRef, {
            group: groupRef
        })
        console.log("finalizado")
    })    
}

const leaveActualUserGroup = async (transaction, userRef, groupRef) => {
    await transaction.update(groupRef, {
        members: arrayRemove(userRef)
    })
    await transaction.update(userRef, {
        group: null
    })
}

const getId = (ref) => {
    const path = ref?._key?.path?.segments
    return path && path[path.length - 1]
}

const joinGroup = async (groupName, user) => {
    const userRef = doc(databaseFirestore, "users", user.uid)
    const groupRef = doc(databaseFirestore, "groups", groupName)
    runTransaction(databaseFirestore, async (transaction) => {
        const fetchedUser = (await transaction.get(userRef)).data()
        if(fetchedUser.group) { 
            await leaveActualUserGroup(transaction, userRef, fetchedUser.group) 
        }
        await transaction.update(groupRef, {
            members: arrayUnion(userRef)
        })
        await transaction.update(userRef, {
            group: groupRef
        })
    })
}

const leaveGroup = async (groupName, user) => {
    const userRef = doc(databaseFirestore, "users", user.uid)
    const groupRef = doc(databaseFirestore, "groups", groupName)
    runTransaction(databaseFirestore, async (transaction) => {
        const fetchedUser = (await transaction.get(userRef)).data()
        await transaction.update(groupRef, {
            members: arrayRemove(userRef)
        })
        const actualGroupId = getId(fetchedUser.group)
        const originalGroupId = getId(groupRef)
        if(actualGroupId === originalGroupId) {
            await transaction.update(userRef, {
                group: null
            })
        }
    })
}

export {leaveGroup, joinGroup, getUser, getMapItems, createVector, getVector, isInfectado, createUserIfNotInDatabase, createGroup }