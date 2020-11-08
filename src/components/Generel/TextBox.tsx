import React, { FC, InputHTMLAttributes } from "react"

export interface ITextBoxProp extends Omit<InputHTMLAttributes<HTMLTextAreaElement>,"onChange"> {
   className?: string
   onChange: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>)=>void
}


const TextBox: FC<ITextBoxProp> = ({onChange, value ,...rest}) => {
return <textarea {...rest} onChange={(event)=>onChange?.(event.target.value, event)} value={value} />
}

export default TextBox;