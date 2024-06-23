import React from 'react'
import { auth, provider } from "../configs/firebase";
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const FriendPage = () => {
  const [user] = useAuthState(auth);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

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