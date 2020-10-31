export interface IComment {
   ref: {
      delete: () => void
      update: () => void
      id: string
   },

}