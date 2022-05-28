import React from 'react'

const AllUsers = (props) => {
    const {userFirstName, userLastName} = props         

  return (
    <div className="usernames">
        <p>{`${userFirstName} ${userLastName}`}</p>
    </div>
  )
}

export default AllUsers