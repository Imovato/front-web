import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  roundedProp?: string;
  children: string;
  color?: string;
}

export function Button({ children, color, roundedProp, className, ...rest }: ButtonProps) {
  return (
    <button
      className={`flex py-2 px-4 transition duration-150 ease-in-out
      hover:bg-opacity-70 bg-${color ?? "red-500"}
      rounded-${roundedProp ?? "lg"} h-10 text-white ${className}`}
      {...rest}
    >
      <p>{children}</p>
    </button>
  );
}
