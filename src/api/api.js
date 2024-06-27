import axios from "axios"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { databaseFirestore } from "../configs/firebase"

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

export { getUser, getMapItems, createVector, getVector, isInfectado, createUserIfNotInDatabase }