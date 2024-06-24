import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthContextProvider';
import useFriends from '../hooks/useFriends';
import { Background } from '../components/Background/Background';
import FriendsList from '../components/FriendsList/FriendsList'
import SearchUser from '../components/SearchUser/SearchUser';

const FriendPage = () => {
  const { user, signIn, logout } = useContext(AuthContext)
  const { friends, loading, error, onRemoveFriend } = useFriends()
  const showFriends = !loading && friends
  const [search, setSearch] = useState("")

  if(!user) {
    return <button onClick={signIn}>login</button>
  }

  const onChangeSearch = ({target}) => {
    setSearch(target.value)
  }  

  return (
    <Background style={backgroundStyle}>
      { showFriends && <> 
        <FriendsList style={{flexGrow: 2}} friends={friends} onRemoveFriend={onRemoveFriend} /> 
        <SearchUser style={{flexGrow: 1}} onChange={onChangeSearch} search={search} />
      </>}
    </Background>
  );
}

const backgroundStyle = {
  boxSizing: "border-box",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  overflowY: "hidden",
  padding: 16,
  gap: 16
}

export default FriendPage