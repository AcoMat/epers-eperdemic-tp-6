import { createContext, useContext, useState } from 'react'
import UserProfileDialog from './UserProfileDialog'
import CreateGroupDialog from './CreateGroupDialog'
import { AuthContext } from '../auth/AuthContextProvider'
import { ToastContainer, toast } from 'react-toastify'

const DialogContext = createContext()

const DialogContextProvider = ({children}) => {
  const { user } = useContext(AuthContext)
  const [userProfile, setUserProfile] = useState(null)
  const shouldShowUserProfile = userProfile !== null
  const [createGroup, setCreateGroup] = useState(false)
  const notify = (message, type) => { return type(message) }

  const close = (id) => {
    toast.dismiss({id: id})
  }

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
    <DialogContext.Provider value={{showUserProfile, showCreateGroup, notify, close}}>
        <ToastContainer newestOnTop={true} autoClose={2000} position='bottom-right' closeOnClick />
        <UserProfileDialog show={shouldShowUserProfile} uid={userProfile} onClose={closeUserProfile} />
        <CreateGroupDialog user={user} show={createGroup} onClose={closeCreateGroup} />
        {children}
    </DialogContext.Provider>
  )
}

export default DialogContextProvider
export { DialogContext }