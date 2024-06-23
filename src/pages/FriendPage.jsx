import React, { useEffect, useState } from 'react'
import { auth, provider, dbFs, dbRt } from "../configs/firebase";
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { createVector, getVector } from '../api/api';
import { ref, set } from 'firebase/database';

const FriendPage = () => {
  const [user] = useAuthState(auth);
  const [userVector, setUserVector] = useState()
  const [vectorToUser, setVectorToUser] = useState()

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const crearVector = async () => {
    try {
      const vector = await createVector({ type: 'HUMANO', ubicacionId: '1' })
      console.log(vector)
      setUserVector(vector)
    } catch (e) {
      console.log(e)
    }
  }

  const recuperarVector = async () => {
    try {
      const vector = await getVector({ vectorId: 1 })
      console.log(vector)
      setUserVector(vector)

      const usuarioVector = {
        displayName: user.displayName,
        email: user.email,
        vector: {
          id: vector.id,
          tipoVector: vector.tipoVector,
        }
      };
      
      setVectorToUser(usuarioVector)
      console.log(usuarioVector)

      set(ref(dbRt, 'users/usuariodbrt'), usuarioVector)

      // setDoc(doc(dbFs, "users", "usuariodbfs"), usuarioVector)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (user) {
      recuperarVector()
    }
  }, [user])

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <>
      <h1>FriendPage</h1>
      {user ? (
        <>
          <h1>Hello, {user?.displayName}</h1>
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      )}
    </>
  );
}

export default FriendPage