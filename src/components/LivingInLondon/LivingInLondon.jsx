import React from 'react'

const LivingInLondon = (props) => {
    const {userLivingInLondon} = props         

  return (
    <div>
        <p>The User {userLivingInLondon} Lives in London</p>
    </div>
  )
}

export default LivingInLondon