import React, { FC, InputHTMLAttributes } from "react"

export interface ITextFieldProp extends Omit<InputHTMLAttributes<HTMLInputElement>,"onChange"> {
   className?: string
   onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>)=>void
}


const TextField: FC<ITextFieldProp> = ({onChange ,...rest}) => {
   return <input {...rest} onChange={(event)=>onChange?.(event.target.value, event)} type="text" />
}

export default TextField;