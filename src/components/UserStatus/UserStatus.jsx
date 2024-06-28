import React from 'react'

const UserStatus = ({user}) => {

    const color = () => {
        if(user.estaInfectado === null || user.estaInfectado === undefined) { return "grey"}
        else if(user.estaInfectado) { return "#800000" }
        else return "#008000"
    }

  return (
    <span style={{width: 12, height: 12, backgroundColor: color(), borderRadius: "50%"}} />
  )
}

export default UserStatus