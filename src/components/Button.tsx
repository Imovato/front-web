import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactChild;
  color?: string;
  hover?: string;
}

export function Button({ children, color, hover, className, ...rest }: ButtonProps) {

  var hoverStyle = 'hover:bg-opacity-70'
  if (hover) {
    hoverStyle = `hover:bg-${hover}-400 dark:hover:bg-${hover}-500`
  }

  return (
    <button
      className={`
        ${hoverStyle}
        bg-${color ?? "red"}-200
        dark:bg-${color ?? "red"}-400
        flex py-2 px-4 transition duration-150 ease-in-out rounded-lg h-10 dark:text-white
        ${className}
      `}
      {...rest}
    >
      <p className="flex gap-2 items-center flex-1 justify-center">
        {children}
      </p>
    </button>
  );
}
