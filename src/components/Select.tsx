import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: Object;
}

export default function Select({ children, ...rest }: SelectProps) {
  return (
    <div className={'w-max min-w-full'}>
      <select {...rest}
        className="w-full h-full bg-white p-2 pr-8 rounded-md text-black
        appearance-none bg-arrow bg-no-repeat bg-right"
      >
        {children}
      </select>
    </div>
  );
}
