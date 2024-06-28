import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, databaseFirestore, provider } from "../configs/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { createUserIfNotInDatabase, createVector } from "../api/api";
import { estaInfectadoConCache } from "./estaInfectadoConCache";

const AuthContext = createContext();
const loadingFirestoreUser = {isLoading: true, firestoreUser: undefined}
const notLoggedInFirestoreUser = {isLoading: false, firestoreUser: undefined}
const loadingFirestoreUserId = {isLoading: true, id: null}
const notLoggedInFirestoreUserId = {isLoading: false, id: null}

const AuthContextProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth, {...provider, onUserChanged: createUserIfNotInDatabase});
  const [firestoreUserId, setFirestoreUserId] = useState(loadingFirestoreUserId);
  const [firestoreUser, setFirestoreUser] = useState(loadingFirestoreUser);
  const loadingUser = firestoreUser.isLoading

  const createUserAsync = async (user) => {
    await createUserIfNotInDatabase(user);
    setFirestoreUserId({isLoading: false, id: user?.uid});
  }

  const renewUserInfectionState = async() => {
    try {
      const infectado = await estaInfectadoConCache(firestoreUser.firestoreUser.vectorId)
      console.log("reset estado user")
      setFirestoreUser(user => {
        return user.firestoreUser === null 
                ? user 
                : ({...user, firestoreUser: {...user.firestoreUser, estaInfectado: infectado}})
      })
    } catch(e) {
      console.log("Error renovando estado de usuario")
    }
  }

  useEffect(() => {
    if (loading) {
      return setFirestoreUserId(loadingFirestoreUserId)
    }
    if (user) {
      createUserAsync(user);
    } else {
      setFirestoreUserId(notLoggedInFirestoreUserId)
    }
  }, [user, loading]);

  useEffect(() => {
    if(firestoreUser.firestoreUser === null) return;
    const renewInfectionState = setInterval(() => {
      renewUserInfectionState()
    }, [10000])
    return () => clearInterval(renewInfectionState)
  }, [firestoreUser?.firestoreUser?.vectorId])

  useEffect(() => {
    if(firestoreUserId.isLoading) return setFirestoreUser(loadingFirestoreUser);
    if(firestoreUserId.id === null) return setFirestoreUser(notLoggedInFirestoreUser);
    let unsuscribe = () => {};
    unsuscribe = onSnapshot(
      doc(databaseFirestore, "users", firestoreUserId.id),
      (doc) => {
        setFirestoreUser({isLoading: false, firestoreUser: {...user, ...doc.data()} });
      }
    );
    return unsuscribe;
  }, [firestoreUserId]);

  const signIn = async () => {
    try {
      const sign = await signInWithPopup(auth, provider);
    } catch (error) {
      logout();
    }
  };

  const logout = () => {
    signOut(auth);
    setFirestoreUserId(notLoggedInFirestoreUserId);
    setFirestoreUser(notLoggedInFirestoreUser);
  };

  const setUserLocation = async (location) => {
    try {
        const userRef = doc(databaseFirestore, "users", user.uid)
        await updateDoc(userRef, {
          location: location
        })
    } catch(e) {
      console.log("Problema actualizando ubicación")
    }
  }

  return (
    <AuthContext.Provider value={{ user: firestoreUser.firestoreUser, logout, signIn, setUserLocation, isLoading: loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };
