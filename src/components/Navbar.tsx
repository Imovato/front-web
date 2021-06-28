import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faHome,
  faCog,
  faSun,
  faMoon,
  faBuilding
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { isDark, toggleDarkMode, updateRootElementColor } from "../utils/darkMode";
import { useState } from "react";

library.add(faSignOutAlt, faSignInAlt, faHome, faCog, faSun, faMoon, faBuilding);

export default function Navbar() {
  const [darkSwitch, setDarkSwitch] = useState(isDark)

  useEffect(() => { updateRootElementColor() }, [])

  return (
    <div className="flex h-24 bg-red-300 dark:bg-gray-800 dark:text-white font-qsand
    text-black font-semibold rounded-b-3xl shadow-xl w-full gap-2">
      <div className="flex-none w-1/6 flex items-center justify-center ">
        <Link to="/">
          {/* <img src={logo} className="w-20 h-20"></img> */}
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            className="w-20 h-20"
          />
        </Link>
      </div>
      <div className="flex flex-auto justify-center">
        <div className="h-full flex items-center justify-center ">
          <p className="text-xl">Imobiliária</p>
        </div>
      </div>
      <div className="flex items-end p-2">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon className="text-lg" icon="sun" />
          <div onClick={() => { toggleDarkMode(); setDarkSwitch(!darkSwitch) }} className="cursor-pointer">
            <span className="relative">
              <span className={`block w-12 h-6 ${darkSwitch ? 'bg-red-400' : 'bg-red-100'} rounded-full shadow-inner`}></span>
              <span className={`absolute block w-5 h-5 mt-0.5 ml-0.5 rounded-full
                  shadow inset-y-0 left-0 focus-within:shadow-outline
                  transition-transform duration-300 bg-white ease-in-out ${darkSwitch ? 'transform translate-x-6' : ''}`}
              >
                <input id="unchecked" type="checkbox" className="absolute opacity-0 w-0 h-0" />
              </span>
            </span>
          </div>
          <FontAwesomeIcon className="text-lg" icon="moon" />
        </div>
      </div>
      <div className="flex gap-1 flex-col items-start justify-between p-3">
        <Link className="flex items-center gap-1" to="/">
          <FontAwesomeIcon icon="home" />
          <p>Início</p>
        </Link>
        <div className="flex gap-6 justify-between">
          {localStorage.getItem("token") && (
            <Link className="flex items-center gap-1" to="/account/profile">
              <FontAwesomeIcon icon="cog" />
              <p>Configurações</p>
            </Link>
          )}
        </div>
        <div className="flex gap-6 justify-between">
          {localStorage.getItem("token") ? (
            <Link className="flex items-center gap-1" to="/session">
              <FontAwesomeIcon icon="sign-out-alt" />
              <p>Log out</p>
            </Link>
          ) : (
            <Link className="flex items-center gap-1" to="/session/new">
              <FontAwesomeIcon icon="sign-in-alt" />
              <p>Log in</p>
            </Link>
          )}
        </div>
      </div>
      <div className="flex gap-1 flex-col items-center justify-between p-3">
        <div className="flex gap-6 justify-between">
          {localStorage.getItem("token") ? (

            <Link className="flex flex-col items-center gap-1" to="/property/user">
              <FontAwesomeIcon className="text-xl" icon="building" />
              <p className="text-center">Meus<br />Imóveis</p>
            </Link>
          ) : (<div />)}
        </div>
      </div>
    </div>
  );
}
