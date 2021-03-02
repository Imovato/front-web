import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex w-screen h-24 bg-red-400 font-qsand text-white font-semibold">
      <div className="flex-none w-1/6 flex items-center justify-center border-r-2 border-red-500">
        LOGO
      </div>
      <div className="flex-auto flex-col">
        <div className="h-full flex items-center justify-center ">
          <p className="text-xl">Imobiliária</p>
        </div>
      </div>
      <div className="flex-none w-1/6 border-l-2 border-red-500">
        <div className="h-1/2 flex items-center justify-center ">
          <p>Bem - vindo</p>
        </div>
        <div className="h-1/2 flex items-center justify-center ">
          <Link to="/session/new">
            <p>Entre ou cadastre-se</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
