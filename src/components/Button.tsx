import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactChild;
  color?: string;
}

export function Button({ children, color, className, ...rest }: ButtonProps) {
  return (
    <button
      className={`flex py-2 px-4 transition duration-150 ease-in-out
      hover:bg-opacity-70 bg-${color ?? "red"}-200 dark:bg-${color ?? "red"}-400
      rounded-lg h-10 dark:text-white ${className}`}
      {...rest}
    >
      <p className="flex gap-2 items-center flex-1 justify-center">{children}</p>
    </button>
  );
}
