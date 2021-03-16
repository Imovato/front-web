import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: string
  color?: string
}

export function Button({ children, color, ...rest }: ButtonProps) {
  return (
    <button
      className={`
      w-1/2 transition duration-150 ease-in-out
      hover:bg-opacity-70 bg-${color ?? "red"}-500
      rounded-lg h-10 text-white`}
      {...rest}
    >
      {children}
    </button>
  )
}
