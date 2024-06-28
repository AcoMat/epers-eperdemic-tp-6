import { createContext, useContext, useState } from 'react'
import UserProfileDialog from './UserProfileDialog'
import CreateGroupDialog from './CreateGroupDialog'
import { AuthContext } from '../auth/AuthContextProvider'
import { ToastContainer, toast } from 'react-toastify'
import GroupDialog from './GroupDialog'

const DialogContext = createContext()

const DialogContextProvider = ({children}) => {
  const { user } = useContext(AuthContext)
  const [userProfile, setUserProfile] = useState(null)
  const shouldShowUserProfile = userProfile !== null
  const [createGroup, setCreateGroup] = useState(false)
  const [showGroup, setShowGroup] = useState(null)
  const notify = (message, type) => { return type(message) }

  const close = (id) => {
    setInterval(() => {
      toast.dismiss({id: id})
    }, [400])
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

  const showGroupWithId = (groupId) => {
    setShowGroup(groupId)
  }

  const closeShowGroup = () => {
    setShowGroup(null)
  }

  return (
    <DialogContext.Provider value={{showUserProfile, showCreateGroup, notify, close, showGroupWithId}}>
        <ToastContainer newestOnTop={true} autoClose={2000} position='bottom-right' closeOnClick />
        <GroupDialog notify={notify} groupId={showGroup} onClose={closeShowGroup} show={showGroup} />
        <UserProfileDialog show={shouldShowUserProfile} uid={userProfile} onClose={closeUserProfile} />
        <CreateGroupDialog user={user} show={createGroup} onClose={closeCreateGroup} />
        {children}
    </DialogContext.Provider>
  )
}

export default DialogContextProvider
export { DialogContext }