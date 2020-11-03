import produce, { Draft } from "immer"
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"


export const useComplexState = <T extends any>(
   initialValue: T,
   dontAutoUpdate: boolean = false
): [
      T,
      (recipe: (draft: Draft<T>) => void) => void,
      Dispatch<SetStateAction<T>>
   ] => {
   const [value, set] = useState(initialValue)
   // Update value when incoming (initial) value updates
   useEffect(() => {
      if (!dontAutoUpdate) {
         set(initialValue)
      }
   }, [initialValue, dontAutoUpdate])

   const update = useCallback((recipe: (draft: Draft<T>) => void) => {
      set(produce(value, recipe))
   }, [value])

   return [value, update, set]

}