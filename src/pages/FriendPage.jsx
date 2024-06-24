import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContextProvider";
import useFriends from "../hooks/useFriends";
import { Background } from "../components/Background/Background";
import FriendsList from "../components/FriendsList/FriendsList";
import SearchUser from "../components/SearchUser/SearchUser";
import useSearch from "../hooks/useSearch";

const FriendPage = () => {
  const { user, signIn, logout } = useContext(AuthContext);
  const { friends, loading, error, onRemoveFriend, onAddFriend } = useFriends();
  const showFriends = !loading && friends;
  const friendsIds = friends.map((friend) => friend.uid);
  const { search, changeSearch, users } = useSearch("");

  if (!user) {
    return <button onClick={signIn}>login</button>;
  }

  return (
    <Background style={backgroundStyle}>
      <FriendsList
        style={{ flexGrow: 2 }}
        friends={friends}
        onRemoveFriend={onRemoveFriend}
      />
      <SearchUser
        style={{ flexGrow: 1 }}
        onAddFriend={onAddFriend}
        friendsIds={friendsIds}
        onChange={changeSearch}
        users={users}
        userId={user.uid}
        search={search}
      />
    </Background>
  );
};

const backgroundStyle = {
  boxSizing: "border-box",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  overflowY: "hidden",
  padding: 16,
  gap: 16,
};

export default FriendPage;
