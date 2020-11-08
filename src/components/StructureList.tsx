import React, { FC } from 'react'
import styled from 'styled-components'

import { useImmerState } from '../hooks/useImmerState'
import { IStructure, useStructures } from '../logic/StructureArea'
import EditStructure from './EditStructure'
import TextField from './Generel/TextField'

const initialNewStructure: IStructure = {
   id: '',
   created: '',
   updated: '',
   name: 'new',
   props: {},
   testCode: [],
   walkerSteps: [],
   childrenIds: [],
   children: []
}

const StructureList: FC = () => {
   const {subscription, subscribe, structures, select, current, add} = useStructures()
   if(!subscription){
      subscribe(); // subscribe
   }

   const [newStructure, update, set] = useImmerState(initialNewStructure)


   return <div>
      Number of structures:
      {structures.length}
      <br />
      {structures.map(structure => 
         <Selected 
            key={structure.id}
            selected={current?.id === structure.id} 
            onClick={()=>select(structure)}
         >
            {structure.name}
         </Selected>
      )}
      <div>
         <b>Create:</b><br/>
         name: 
         <TextField 
            value={newStructure.name} 
            onChange={(value)=>{
               update(draft=>{
                  draft.name = value
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
      {current && <EditStructure />}
   </div>
}

interface ISelected {
   selected?:boolean
}

const Selected = styled.div<ISelected>`
   padding: 8px;
   cursor: pointer;
   width: 160px;
   background: ${({selected})=>selected?'#ccc':'#fff'};
   &:hover {
      background: #ddd;
   }
`

export default StructureList