import { createContext, useContext, useState } from 'react'
import UserProfileDialog from './UserProfileDialog'
import CreateGroupDialog from './CreateGroupDialog'
import { AuthContext } from '../auth/AuthContextProvider'
import { ToastContainer } from 'react-toastify'

const DialogContext = createContext()

const DialogContextProvider = ({children}) => {
  const { user } = useContext(AuthContext)
  const [userProfile, setUserProfile] = useState(null)
  const shouldShowUserProfile = userProfile !== null
  const [createGroup, setCreateGroup] = useState(false)
  const notify = (message, type) => { type(message) }

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
    <DialogContext.Provider value={{showUserProfile, showCreateGroup, notify}}>
        <ToastContainer position='bottom-right' />
        <UserProfileDialog show={shouldShowUserProfile} uid={userProfile} onClose={closeUserProfile} />
        <CreateGroupDialog user={user} show={createGroup} onClose={closeCreateGroup} />
        {children}
    </DialogContext.Provider>
  )
}

export default DialogContextProvider
export { DialogContext }