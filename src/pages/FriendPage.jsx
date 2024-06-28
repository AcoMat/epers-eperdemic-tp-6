import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContextProvider";
import useFriends from "../hooks/useFriends";
import { Background } from "../components/Background/Background";
import FriendsList from "../components/FriendsList/FriendsList";
import SearchUser from "../components/SearchUser/SearchUser";
import useSearch from "../hooks/useSearch";
import { DialogContext } from "../dialogs/DialogContextProvider"
import './FriendPage.css'
import Loading from "../components/Loading/Loading";

const FriendPage = () => {
  const { user, signIn, logout } = useContext(AuthContext);
  const { friends, loading, error, onRemoveFriend, onAddFriend } = useFriends();
  const friendsIds = friends.map((friend) => friend.uid);
  const { search, changeSearch, users } = useSearch("");
  const { showUserProfile } = useContext(DialogContext)

  const onFriendClick = (uid) => {
    showUserProfile(uid)
  }

  return (
    <Background className='friend-page-container'>
      {
        loading ? <Loading className='friend-page-loader' />
        :
        <FriendsList
          friends={friends}
          onFriendClick={onFriendClick}
          onRemoveFriend={onRemoveFriend}/> 
      }
      
      <SearchUser
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
