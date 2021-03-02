import React from "react";

interface SelectProps {
  children: Object;
  divClass: string;
}

export default function Select({ children, divClass }: SelectProps) {
  return (
    <div className={divClass.concat(" flex h-10")}>
      <select className="w-full h-full rounded-xl text-black" placeholder="">
        {children}
      </select>
    </div>
  );
}
