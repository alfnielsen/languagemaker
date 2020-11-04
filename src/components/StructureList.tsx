import React, { FC } from 'react'
import styled from 'styled-components'

import { useComplexState } from '../hooks/useComplexState'
import { IStructure, useStructures } from '../logic/StructureArea'
import EditStructure from './EditStructure'

const initialNewStructure: IStructure = {
   id: '',
   created: '',
   updated: '',
   name: 'new',
   props: {},
   childrenIds: [],
   children: []
}

const StructureList: FC = () => {
   const {subscription, subscribe, structures, select, current, add} = useStructures()
   if(!subscription){
      subscribe(); // subscribe
   }

   const [newStructure, update, set] = useComplexState(initialNewStructure)


   return <div>
      Number of structures:
      {structures.length}
      <br />
      {structures.map(structure => 
         <Selected 
            selected={current?.id === structure.id} 
            onClick={()=>select(structure)}
         >
            {structure.name}
         </Selected>
      )}
      <div>
         <b>Create:</b><br/>
         name: 
         <input 
            type="text" 
            value={newStructure.name} 
            onChange={(evt)=>{
               update(draft=>{
                  draft.name = evt.target.value
               })
            }} 
         />
         <button
            onClick={()=>{
               add(newStructure)
               set(initialNewStructure)
            }}
         >Add</button>

      </div>
      {current &&       <EditStructure />}
   </div>
}

interface ISelected {
   selected?:boolean
}

const Selected = styled.div<ISelected>`
   padding: 8px;
   cursor: pointer;
   background: ${({selected})=>selected?'#ccc':'#fff'};
   &:hover {
      background: #ddd;
   }
`

export default StructureList