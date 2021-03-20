import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  type: string
  color?: string
}

export function Input({ type, name, color, className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={`focus:ring focus:ring-${color ?? "red"}-200 w-full h-10
        px-3 rounded-lg bg-gray-200 mt-2 dark:bg-gray-600 ${className}`}
      type={type}
      name={name}
      id={name}/>
    )
  }
