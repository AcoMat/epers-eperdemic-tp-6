import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContextProvider";
import useFriends from "../hooks/useFriends";
import { Background } from "../components/Background/Background";
import FriendsList from "../components/FriendsList/FriendsList";
import SearchUser from "../components/SearchUser/SearchUser";
import useSearch from "../hooks/useSearch";
import { DialogContext } from "../dialogs/DialogContextProvider"
import './FriendPage.css'

const FriendPage = () => {
  const { user, signIn, logout } = useContext(AuthContext);
  const { friends, loading, error, onRemoveFriend, onAddFriend } = useFriends();
  const showFriends = !loading && friends;
  const friendsIds = friends.map((friend) => friend.uid);
  const { search, changeSearch, users } = useSearch("");
  const { showUserProfile } = useContext(DialogContext)

  if (!user) {
    return <button onClick={signIn}>login</button>;
  }

  const onFriendClick = (uid) => {
    showUserProfile(uid)
  }

  return (
    <Background className='friend-page-container'>
      <FriendsList
        friends={friends}
        onFriendClick={onFriendClick}
        onRemoveFriend={onRemoveFriend}
      />
      <SearchUser
        style={{ flexGrow: 1 }}
        onAddFriend={onAddFriend}
        friendsIds={friendsIds}
        onChange={changeSearch}
        onSearchPress={() => {}}
        users={users}
        userId={user.uid}
        search={search}
      />
    </Background>
  );
};

export default FriendPage;
