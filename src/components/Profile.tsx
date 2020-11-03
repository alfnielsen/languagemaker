import React, { FC } from 'react'

import { useUser } from '../logic/UserArea'

const Profile: FC = () => {
   const {subscription, user, signIn, subscribe} = useUser()
   if(!subscription){
      subscribe(); // subscribe to user
   }

   if(!user){
      return <button onClick={()=>signIn()}>
         Sign in
      </button>
   }
   return <div>
      User:{user.displayName}
   </div>
}

export default Profile