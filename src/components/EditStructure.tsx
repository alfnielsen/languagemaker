import produce from 'immer'
import React, { FC } from 'react'

import { useStructures } from '../logic/StructureArea'

interface IEditStructureProp {

}

const EditStructure: FC<IEditStructureProp> = () => {
   const {current, update, remove} = useStructures()
   if(!current)return null

   return <div>
      <hr/>
      <b>Edit structure:</b><br/>
         name: 
         <input 
            type="text" 
            value={current.name} 
            onChange={(evt)=>{
               update(produce(current, draft=>{
                  draft.name = evt.target.value
               }))
            }} 
         />
         <button
            onClick={()=>{
               remove(current)
            }}
         >
            Delete
         </button>

      </div>
}


export default EditStructure