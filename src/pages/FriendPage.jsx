import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContextProvider';
import useFriends from '../hooks/useFriends';

const FriendPage = () => {
  const { user, signIn, logout } = useContext(AuthContext)
  const { friends } = useFriends()

  if(!user) {
    return <button onClick={signIn}>login</button>
  }

  return (
    <>
      <h1>FriendPage</h1>
      {friends.map(friend => (<div key={friend.uid}>{friend.displayName}</div>))}
      {user ? (
        <>
          <h1>Hello, {user?.displayName}</h1>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <button onClick={signIn}>Sign In with Google</button>
      )}
    </>
  );
}

export default FriendPage