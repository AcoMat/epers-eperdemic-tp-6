import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, databaseFirestore, provider } from "../configs/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { createVector } from "../api/api";

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

    const [user, loading, error] = useAuthState(auth, provider);
    const [firestoreUserId, setFirestoreUserId] = useState(null)
    const [firestoreUser, setFirestoreUser] = useState(undefined)

    useEffect(() => {
        const createUserAync = async () => {
            await createUserIfNotInDatabase(user)
            setFirestoreUserId(user?.uid)
        }
        if(user) { createUserAync() }
    }, [user])

    useEffect(() => {
        if(firestoreUserId === null) return;
        let unsuscribe = () => {}
        unsuscribe = onSnapshot(doc(databaseFirestore, "users", firestoreUserId), (doc) => {
            setFirestoreUser({...user, ...doc.data()})
        })
        return unsuscribe
    }, [firestoreUserId])

    const signIn = async () => {
        try {
            await signInWithPopup(auth, provider)
        } catch (error) {
            logout()
        }
    }

    const createUserIfNotInDatabase = async (user) => {
        const docRef = doc(databaseFirestore, "users", user.uid)
        const fetchedUser = await getDoc(docRef)
        if(!fetchedUser.exists()) {
            const vectorId = await createVector({type: "HUMANO", ubicacionId: 1})
            await setDoc(docRef, {vectorId: vectorId, friendsIds: []})
        }
    }

    const logout = () => {
        signOut(auth)
        setFirestoreUserId(null)
        setFirestoreUser(undefined)
    } 

    return (
        <AuthContext.Provider value={{user: firestoreUser, logout, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
export { AuthContext }