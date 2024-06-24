import React from 'react'

const UserStatus = ({user}) => {

    const color = () => {
        if(user.estaInfectado === null) { return "grey"}
        else if(user.estaInfectado) { return "red" }
        else return "green"
    }

  return (
    <span style={{width: 12, height: 12, backgroundColor: color(), borderRadius: "50%"}} />
  )
}

export default UserStatus