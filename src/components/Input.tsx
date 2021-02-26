import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  type: string
  color?: string
}

export function Input({type, name, color, ...rest}: InputProps) {
  return (
    <input {...rest} className={`focus:ring focus:ring-${color ?? "red"}-200 w-full h-10 px-3 rounded-lg bg-gray-200 mt-2`} type={type} name={name} id={name}/>
    )
  }
