import { createContext, useState } from 'react'
import UserProfileDialog from './UserProfileDialog'

const DialogContext = createContext()

const DialogContextProvider = ({children}) => {
  const [userProfile, setUserProfile] = useState(null)
  const shouldShowUserProfile = userProfile !== null

  const showUserProfile = (uid) => {
    setUserProfile(uid)
  }

  const closeUserProfile = () => {
    setUserProfile(null)
  }

  return (
    <DialogContext.Provider value={{showUserProfile}}>
        <UserProfileDialog show={shouldShowUserProfile} uid={userProfile} onClose={closeUserProfile} />
        {children}
    </DialogContext.Provider>
  )
}

export default DialogContextProvider
export { DialogContext }