import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex h-24 bg-red-400 font-qsand text-white font-semibold rounded-b-3xl shadow-xl w-full">
      <div className="flex-none w-1/6 flex items-center justify-center border-r-2 border-red-500">
        <Link to="/">
          {/* <img src={logo} className="w-20 h-20"></img> */}
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            className="w-20 h-20"
          />
        </Link>
      </div>
      <div className="flex-auto flex-col">
        <div className="h-full flex items-center justify-center ">
          <p className="text-xl">Imobiliária</p>
        </div>
      </div>
      <div className="flex-none w-1/6 border-l-2 border-red-500">
        <div className="h-1/2 flex items-center justify-evenly ">
          <p>Bem - vindo</p>
          {localStorage.getItem("userId") && (
            <Link to="/session">
              <p> Log out</p>
            </Link>
          )}
        </div>
        <div className="h-1/2 flex items-center justify-evenly ">
          <Link to="/session/new">
            <p>Entre ou cadastre-se</p>
          </Link>
          {localStorage.getItem("userId") && (
            <Link to="/account/profile">
              <p>Perfil</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
