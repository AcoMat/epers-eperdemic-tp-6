import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, databaseFirestore, provider } from "../configs/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { createUserIfNotInDatabase, createVector } from "../api/api";

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

  console.log(error)

  useEffect(() => {
    const createUserAync = async () => {
      await createUserIfNotInDatabase(user);
      setFirestoreUserId({isLoading: false, id: user?.uid});
    };
    if (loading) {
      return setFirestoreUserId(loadingFirestoreUserId)
    }
    if (user) {
      createUserAync();
    } else {
      setFirestoreUserId(notLoggedInFirestoreUserId)
    }
  }, [user, loading]);

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
      console.log(sign)
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
    const userRef = doc(databaseFirestore, "users", user.uid)
    await updateDoc(userRef, {
      location: location
    })
  }

  return (
    <AuthContext.Provider value={{ user: firestoreUser.firestoreUser, logout, signIn, setUserLocation, isLoading: loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };
