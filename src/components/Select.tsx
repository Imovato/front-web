import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface SelectProps {
  children: Object;
  divClass?: string;
}

export default function Select({ children, divClass }: SelectProps) {
  return (
    <div className={'w-max min-w-full'}>
      <select className="w-full h-full bg-white p-2 pr-8 rounded-md text-black appearance-none bg-arrow bg-no-repeat bg-right">
        {children}
      </select>
    </div>
  );
}
