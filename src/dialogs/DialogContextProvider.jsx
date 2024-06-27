import { createContext, useContext, useState } from 'react'
import UserProfileDialog from './UserProfileDialog'
import CreateGroupDialog from './CreateGroupDialog'
import { AuthContext } from '../auth/AuthContextProvider'

const DialogContext = createContext()

const DialogContextProvider = ({children}) => {
  const { user } = useContext(AuthContext)
  const [userProfile, setUserProfile] = useState(null)
  const shouldShowUserProfile = userProfile !== null
  const [createGroup, setCreateGroup] = useState(false)

  const showUserProfile = (uid) => {
    setUserProfile(uid)
  }

  const closeUserProfile = () => {
    setUserProfile(null)
  }

  const showCreateGroup = () => {
    setCreateGroup(true)
  }

  const closeCreateGroup = () => {
    setCreateGroup(false)
  }

  return (
    <DialogContext.Provider value={{showUserProfile, showCreateGroup}}>
        <UserProfileDialog show={shouldShowUserProfile} uid={userProfile} onClose={closeUserProfile} />
        <CreateGroupDialog user={user} show={createGroup} onClose={closeCreateGroup} />
        {children}
    </DialogContext.Provider>
  )
}

export default DialogContextProvider
export { DialogContext }