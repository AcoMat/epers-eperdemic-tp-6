import React, { useEffect, useState } from 'react'
import { auth, provider, databaseRealtime } from "../configs/firebase";
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createVector, getVector } from '../api/api';
import { onDisconnect, ref, set, update } from 'firebase/database';

const FriendPage = () => {
  const [user] = useAuthState(auth);
  const [userVector, setUserVector] = useState()
  const [vectorToUser, setVectorToUser] = useState()

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error al autenticar con google", error);
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
      const vector = await getVector({ vectorId: 1 }) //VECTOR HARDCODEADO
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

      const uid = user.uid;
      const docUserRef = ref(databaseRealtime, 'users/' + uid)
      set(docUserRef, usuarioVector)
      const docUserStatusRef = ref(databaseRealtime, 'status/' + uid)

      set(docUserStatusRef, { state: 'online' })
      onDisconnect(docUserStatusRef, { state: 'offline' })

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
    auth.signOut().then(() => {
      if (user) {
      const docUserStatusRef = ref(databaseRealtime, 'status/' + user.uid)
      update(docUserStatusRef, { state: 'offline' })
      }
    }).catch((error) => {
      console.error('Error al hacer logout:', error);
    });
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