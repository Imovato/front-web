import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: Object;
}

export default function Select({ children, ...rest }: SelectProps) {
  return (
    <div className={'w-max min-w-full'}>
      <select {...rest}
        className={`w-full h-full bg-white dark:bg-gray-600 dark:text-white
        p-1.5 pr-8 rounded-md text-black appearance-none bg-arrow bg-no-repeat bg-right ${rest.className} focus:ring focus:ring-red-200`}
      >
        {children}
      </select>
    </div>
  );
}
